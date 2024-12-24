import { useQuery } from "@tanstack/react-query";

interface AdviceType {
  slip: { advice: string; id: number };
}

function App() {
  const { data, isLoading, refetch } = useQuery<AdviceType>({
    queryKey: ["advice"],
    queryFn: async () =>
      (
        await fetch(`https://api.adviceslip.com/advice?timestamp=${Date.now()}`)
      ).json(),
    staleTime: 0,
  });

  return (
    <main>
      <section>
        <h2>Advice #{data?.slip.id}</h2>

        <h1>“{data?.slip.advice}”</h1>

        <picture>
          <source
            media="(max-width: 480px)"
            srcSet="/pattern-divider-mobile.svg"
          />
          <img
            src="/pattern-divider-desktop.svg"
            alt="divider"
            className="divider"
          />
        </picture>

        <button onClick={() => refetch()} disabled={isLoading}>
          <img src="/icon-dice.svg" alt="refetch" />
        </button>
      </section>
    </main>
  );
}

export default App;
