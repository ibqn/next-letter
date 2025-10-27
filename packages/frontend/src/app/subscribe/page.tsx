import { Logo } from "@/components/logo"
import { SubscribeForm } from "@/components/subscribe-form"

type Props = {}

export default function Subscribe(props: Props) {
  return (
    <main className="container p-0 md:py-24">
      <div className="mx-auto flex flex-col rounded-lg border border-neutral-400 px-10 py-8 shadow-xl md:w-1/2">
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Logo className="h-20 w-20" />
          <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight md:text-left lg:text-5xl">
            Join my Newsletter!
          </h1>
        </div>
        <p className="leading-7 not-first:mt-6">
          Elevate your coding skills with exclusive access to the latest tutorials, expert tips, coding challenges, and
          more! Whether you're a beginner or a seasoned developer, my compact newsletter has everything to keep you
          ahead. Join the community and transform your coding dreams into reality. Sign up for free today!
        </p>
        <SubscribeForm />
        <p className="mt-4">I respect your privacy. Unsubscribe at any time.</p>
      </div>
    </main>
  )
}
