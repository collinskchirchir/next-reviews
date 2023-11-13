import { ReactNode } from "react"
import { jakartaSans } from "@/app/fonts"

export interface Props {
   children: ReactNode
}
export default function Heading({children}: Props) {
   return (
      <h1
         className={`font-bold text-2xl pb-3 ${jakartaSans.className}`}
      >
      {children}
      </h1>
   )
}