import { useNavigate } from "react-router-dom";

import PokemonCard from "@/components/PokemonCard/PokemonCard";
import TextBlock from "@/components/ui/TextBlock/TextBlock";
import { usePokemonList } from "@/hooks/pokemon/usePokemonList";
import { isApiClientError } from "@/lib/errors";

import styles from "./DeckPage.module.scss";

export default function DeckPage() {
  const navigate = useNavigate();
  const { data: pokemons, isError, error } = usePokemonList();

  const errorMessage = isApiClientError(error)
    ? error.message
    : "Something went wrong. Please try again.";

  return (
    <section className={styles.page}>
      <div className="container">
        <TextBlock
          title="Il tuo Poké Deck"
          description="Dai un'occhiata al più grande e completo database di carte Pokémon! Troverai carte di ogni espansione e tante curiosità sulle tue collezioni. Clicca sui tuoi Pokémon per scoprire di più su di loro!"
        />

        {isError && (
          <TextBlock
            variant="empty"
            description={errorMessage}
            className={styles["textBlock--error"]}
          />
        )}

        {pokemons && pokemons.length === 0 && (
          <TextBlock
            variant="empty"
            description="Non sono stati trovati risultati per questa pagina, ti invitiamo a riprovare"
            className={styles["textBlock--error"]}
          />
        )}

        {pokemons && pokemons.length > 0 && (
          <div className={styles.grid}>
            {pokemons.map((pokemon) => (
              <button
                key={pokemon.id}
                className={styles.grid__item}
                onClick={() => navigate(`/pokemons/${pokemon.id}`)}
              >
                <PokemonCard
                  variant="compact"
                  number=""
                  name={pokemon.name}
                  description={pokemon.shortDescription}
                  imageSrc={pokemon.imageUrl}
                  typologyName=""
                  typologyIcon={null}
                  footerLabel=""
                  footerIcons={[]}
                  items={[]}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
