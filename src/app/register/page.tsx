import RegisterForm from "@/components/Forms/RegisterForm"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Register | Next App"
}

export default function Home() {
  return (
    <section className="mt-6">
      <article>
        <h1 className="text-orange-400 text-7xl font-bold">
          Register!
        </h1>
      </article>
      <article>
        <RegisterForm />
      </article>
    </section>
  )
}