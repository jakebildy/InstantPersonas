// import { Button } from "../Button";
import { Container } from "../Container";
import { LampContainer } from "../ui/lamp";
import { Button } from "../ui/moving_border";

export function CallToAction() {
  return (
    <section
      id="get-started-today"
      className="relative overflow-hidden bg-black py-32"
    >
      <Container className="relative">
        <LampContainer>
          <div className="mx-auto max-w-lg text-center">
            <h2 className="font-display text-3xl tracking-tight text-white sm:text-6xl font-bold">
              Get started today
            </h2>
            <p className="mt-4 text-lg tracking-tight text-white">
              <b>It’s time to take back your time.</b>
            </p>
            <p className="mt-4 text-lg tracking-tight text-white mb-10">
              Save hours by generating in-depth personas effortlessly with
              InstantPersonas.
            </p>

            <Button href="/register" color="white" className=" font-bold">
              Get 3 days FREE
            </Button>
          </div>
        </LampContainer>
      </Container>
    </section>
  );
}
