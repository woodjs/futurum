/// <reference types="next" />
/// <reference types="next/image-types/global" />

declare module '*.png' {
  const content: StaticImageData
  export default content
}

declare module '*.jpg' {
  const content: StaticImageData
  export default content
}

declare module '*.jpeg' {
  const content: StaticImageData
  export default content
}
