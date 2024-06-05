import LoginForm from "@/components/Forms/LoginForm"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Product management | Next App"
}

export default function Home() {
  return (
    <section className="mt-6">
      <article className="mt-4">
        <h1 className="text-orange-400 text-7xl font-bold">
          Manage your projects!
        </h1>
      </article>
      <article className="mt-4">
        <p className="text-xs font-extrabold">
          This is a sample project to practice Next.js, you can register, login to see your products. Insise, you will be able to insert, delete, update and see all your products. This project also uses a PostgreSQL database, and a Python FastAPI.
        </p>
      </article>
      <article className="mt-4">
        <LoginForm />
      </article>
    </section>
  )
}