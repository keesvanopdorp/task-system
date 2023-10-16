/// <reference types="next" />
/// <reference types="next/image-types/global" />

declare module '*.scss' {
	export const content: { [className: string]: string };
	export default content;
}
// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
