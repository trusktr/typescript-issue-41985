import type {JSX} from 'solid-js'
type test = JSX.IntrinsicElements // No error, thanks to the `import`

/* @jsxImportSource solid-js */
const div = <div /> // still JSX is not found
