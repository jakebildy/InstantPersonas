import { Button } from "../Button";
import { Container } from "../Container";

export function CallToAction() {
  return (
    <section
      id="get-started-today"
      className="relative overflow-hidden bg-black py-32"
    >
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Get started today
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white">
            <b>It’s time to take back your time.</b>
          </p>
          <p className="mt-4 text-lg tracking-tight text-white">
            Save hours by generating in-depth analyses effortlessly with AI
            Consulting Tools.
          </p>
          <Button href="/register" color="white" className="mt-10">
            Get 3 days free
          </Button>
        </div>
      </Container>
    </section>
  );
}
