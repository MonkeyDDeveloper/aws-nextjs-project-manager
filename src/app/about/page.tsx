import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | Next App"
}

export default function Home() {
  return (
    <section className="mt-6">
      <h1 className="text-orange-400 text-7xl font-bold">
        About page!
      </h1>
    </section>
  )
}