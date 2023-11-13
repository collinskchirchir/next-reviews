import { ReactNode } from "react"

export interface Props {
   children: ReactNode
}
export default function Heading({children}: Props) {
   return (
      <h1
         className="font-bold text-2xl pb-3"
      >
      {children}
      </h1>
   )
}