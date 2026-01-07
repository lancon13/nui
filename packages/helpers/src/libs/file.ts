export async function toDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = function (event: ProgressEvent<FileReader>) {
            resolve(event.target?.result as string)
        }
        reader.onerror = function (error) {
            reject(error)
        }
        reader.readAsDataURL(file)
    })
}

export async function fromDataUrl(dataUrl: string, fileName: string): Promise<File> {
    const [byteMime, byteData] = dataUrl.split(',')
    const byteString = atob(byteData ?? '')
    const mimeType = (((byteMime ?? '').split(':') ?? [])?.[1] ?? '').split(';')[0]
    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)
    for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i)

    return new File([ab], fileName, { type: mimeType || 'application/octet-stream' })
}

export async function fromFileUrl(fileUrl: string, fileName: string = ''): Promise<File> {
    try {
        // Step 1: Fetch the file from the provided URL.
        // The fetch API returns a Promise that resolves to the Response to that request.
        const completeFileUrl = fileUrl.startsWith('http')
            ? fileUrl
            : `${window.location.origin}${fileUrl.startsWith('/') ? '' : '/'}${fileUrl}`
        fileName = fileName || (completeFileUrl.split('/').pop() ?? '')
        fileName = fileName.includes('___') ? (fileName.split('___')[1] ?? fileName) : fileName
        const response = await fetch(completeFileUrl)

        // Step 2: Check if the request was successful.
        // response.ok is a boolean that is true if the response status code is in the 200-299 range.
        if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`)

        // Step 3: Get the file content as a Blob.
        // The blob() method of the Response interface takes a Response stream
        // and reads it to completion. It returns a promise that resolves with a Blob.
        // A Blob is a file-like object of immutable, raw data.
        const blob = await response.blob()

        // Step 4: Create a File object from the Blob.
        // The File constructor creates a new File object.
        // It takes an array of Blob/BufferSource/String parts, the file name,
        // and an optional options object where you can specify the file's MIME type
        // and last modified date.
        // We use blob.type to get the MIME type from the fetched blob.
        // If blob.type is empty, 'application/octet-stream' is used as a generic fallback.
        const file = new File([blob], fileName, {
            type: blob.type || 'application/octet-stream',
            lastModified: new Date().getTime()
        })

        return file
    } catch (error) {
        // Log the error and re-throw it so the caller can handle it.
        console.error('Error creating File from URL:', error)
        throw error
    }
}

/**
 * Gets the MIME type of a file.  Uses the file's type property if available,
 * otherwise attempts to determine it from the file name extension.
 *
 * @param file The File object.
 * @returns The MIME type as a string (e.g., 'image/jpeg', 'application/pdf'),
 *          or 'application/octet-stream' if the type cannot be determined.
 */
export function getMime(file: File): string {
    // First, try using the file's built-in type property
    if (file.type) return file.type

    // If the type is not available, try to determine it from the file extension
    const filename = file.name.toLowerCase()
    const extension = filename.substring(filename.lastIndexOf('.') + 1)

    switch (extension) {
        case 'jpg':
        case 'jpeg':
            return 'image/jpeg'
        case 'png':
            return 'image/png'
        case 'gif':
            return 'image/gif'
        case 'webp':
            return 'image/webp'
        case 'bmp':
            return 'image/bmp'
        case 'svg':
            return 'image/svg+xml'
        case 'pdf':
            return 'application/pdf'
        case 'doc':
            return 'application/msword'
        case 'docx':
            return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        case 'xls':
            return 'application/vnd.ms-excel'
        case 'xlsx':
            return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        case 'ppt':
            return 'application/vnd.ms-powerpoint'
        case 'pptx':
            return 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
        case 'txt':
            return 'text/plain'
        case 'zip':
            return 'application/zip'
        case 'rar':
            return 'application/rar'
        case 'csv':
            return 'text/csv'
        case 'mp3':
            return 'audio/mpeg'
        case 'wav':
            return 'audio/wav'
        case 'mp4':
            return 'video/mp4'
        case 'mov':
            return 'video/quicktime'
        case 'avi':
            return 'video/avi'
        default:
            return 'application/octet-stream' // Unknown type
    }
}