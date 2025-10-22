<template>
  <NuiList
    shadow
    :offset="[0, 0]"
    @mouseover="handleListMouseover"
    @mouseout="handleListMouseout"
  >
    <template v-for="(item, index) in props.items" :key="item.value">
      <NuiListItem
        :ref="(el) => { if (el) itemRefs[index] = el; }"
        hoverable
        focusable
        clickable
        @keydown="handleItemKeydown($event, item, index)"
        @click="item.children?.length ? handleSubmenuTriggerClick($event) : item.onClick?.($event)"
        @focus="!item.children?.length ? item.onFocus?.($event) : null"
        @blur="!item.children?.length ? item.onBlur?.($event) : null"
        @mouseover="item.children?.length ? handleSubmenuTriggerMouseover(item) : item.onMouseOver?.($event)"
        @mouseout="item.children?.length ? handleSubmenuTriggerMouseout(item) : item.onMouseOut?.($event)"
        :class="{'has-submenu': item.children?.length}"
      >
        <span class="nui-menu__item-label">{{ item.label }}</span>
        <NuiIcon v-if="item.children?.length" name="chevron-right" class="nui-menu__item-icon" />
        <NuiPopOver
          v-if="item.children?.length"
          display-position="right"
          anchor-position="start"
          v-model="openSubmenus[item.value]"
          class="nui-menu__submenu"
          nested
        >
          <RecursiveMenu
            :ref="(el) => { if (el) submenuRecursiveMenuRefs[item.value] = el; }"
            :items="item.children"
            :ancestors="[...props.ancestors, item]"
            :parent-list-item-ref="itemRefs[index]"
          />
        </NuiPopOver>
      </NuiListItem>
    </template>
  </NuiList>
</template>

<script setup lang="ts">
import { ref, onBeforeUpdate, nextTick, inject, Ref, computed } from 'vue'
import NuiPopOver from './NuiPopOver.vue'
import NuiList from './NuiList.vue'
import NuiListItem from './NuiListItem.vue'
import NuiIcon from './NuiIcon.vue'

// Define NuiMenuItem interface (needs to be imported or defined here)
export interface NuiMenuItem {
  label: string
  value: string
  onClick?: (payload: MouseEvent) => void
  onFocus?: (payload: FocusEvent) => void
  onBlur?: (payload: FocusEvent) => void
  onMouseOver?: (payload: MouseEvent) => void
  onMouseOut?: (payload: MouseEvent) => void
  children?: NuiMenuItem[]
}

// Define the injected API interface
interface RecursiveMenuState {
  openSubmenus: Ref<Record<string, boolean>>;
  submenuTimeouts: Ref<Record<string, number>>;
  handleSubmenuMouseOver: (item: NuiMenuItem) => void;
  handleSubmenuMouseOut: (item: NuiMenuItem) => void;
}

// Inject the menu state and handlers
const { openSubmenus, submenuTimeouts, handleSubmenuMouseOver, handleSubmenuMouseOut } = inject('menu-state') as RecursiveMenuState;

// Props for this component
const props = defineProps({
  items: {
    type: Array as PropType<NuiMenuItem[]>,
    required: true,
  },
  ancestors: {
    type: Array as PropType<NuiMenuItem[]>,
    required: true,
  },
  parentListItemRef: {
    type: Object as PropType<HTMLElement | null>,
    default: null,
  },
});

const itemRefs = ref<HTMLElement[]>([]); // To hold refs to NuiListItem
const submenuRecursiveMenuRefs = ref<Record<string, InstanceType<typeof RecursiveMenu> | null>>({}); // Renamed type

// Ensure itemRefs is reset before each update
onBeforeUpdate(() => {
  itemRefs.value = [];
});

// Focus management methods
const focusFirstItem = () => {
  if (itemRefs.value.length > 0) {
    itemRefs.value[0].$el.focus();
  }
};

const focusLastItem = () => {
  if (itemRefs.value.length > 0) {
    itemRefs.value[itemRefs.value.length - 1].$el.focus();
  }
};

const focusNextItem = (currentIndex: number) => {
  if (currentIndex < itemRefs.value.length - 1) {
    itemRefs.value[currentIndex + 1].$el.focus();
  } else {
    focusFirstItem(); // Loop around
  }
};

const focusPreviousItem = (currentIndex: number) => {
  if (currentIndex > 0) {
    itemRefs.value[currentIndex - 1].$el.focus();
  }
};

defineExpose({ focusFirstItem, focusLastItem }); // Expose methods for parent components

// Event handlers for NuiList
const handleListMouseover = () => {
  props.ancestors.forEach((ancestor) => {
    handleSubmenuMouseOver(ancestor);
  });
};

const handleListMouseout = () => {
  if (props.ancestors.length > 0) {
    const immediateParent = props.ancestors[props.ancestors.length - 1];
    handleSubmenuMouseOut(immediateParent);
  }
};

// Event handler for NuiListItem keydown
const handleItemKeydown = (e: KeyboardEvent, item: NuiMenuItem, index: number) => {
  const focusedElement = document.activeElement;
  const currentItemIndex = itemRefs.value.findIndex(el => el === focusedElement);

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    focusNextItem(currentItemIndex);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    focusPreviousItem(currentItemIndex);
  }
  // Handle Space/ArrowRight/ArrowLeft on submenu triggers
  else if (item.children?.length) { // isSubmenuTrigger
    if (e.key === ' ' || e.key === 'ArrowRight') {
      e.preventDefault();
      handleSubmenuMouseOver(item);
      nextTick(() => {
        const submenuComponent = submenuRecursiveMenuRefs.value[item.value];
        if (submenuComponent && submenuComponent.focusFirstItem) {
          submenuComponent.focusFirstItem();
        }
      });
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handleSubmenuMouseOut(item);
      if (props.parentListItemRef) {
        props.parentListItemRef.$el.focus();
      }
    }
  } else if (e.key === 'ArrowLeft') { // For final items, ArrowLeft should close current submenu and focus parent
    e.preventDefault();
    if (props.ancestors.length > 0) {
      const immediateParent = props.ancestors[props.ancestors.length - 1];
      handleSubmenuMouseOut(immediateParent);
      if (props.parentListItemRef) {
        props.parentListItemRef.$el.focus();
      }
    }
  }
};

// Event handlers for NuiListItem mouse events (for non-submenu triggers)
const handleNonTriggerMouseover = (e: MouseEvent, item: NuiMenuItem) => {
  item.onMouseOver?.(e);
};
const handleNonTriggerMouseout = (e: MouseEvent, item: NuiMenuItem) => {
  item.onMouseOut?.(e);
};

// Event handlers for NuiListItem mouse events (for submenu triggers)
const handleSubmenuTriggerMouseover = (item: NuiMenuItem) => {
  props.ancestors.forEach((ancestor) => {
    handleSubmenuMouseOver(ancestor);
  });
  handleSubmenuMouseOver(item);
};
const handleSubmenuTriggerMouseout = (item: NuiMenuItem) => {
  handleSubmenuMouseOut(item);
};
const handleSubmenuTriggerClick = (e: MouseEvent) => {
  e.stopImmediatePropagation();
};

</script>

<style lang="css" scoped>
/* Styles for RecursiveMenu.vue */
/* This component doesn't have its own specific styles beyond what NuiList/NuiListItem provide */
/* However, if there were any, they would go here. */
</style>