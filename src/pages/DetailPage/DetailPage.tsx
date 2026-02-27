import DOMPurify from "dompurify";
import { useNavigate, useParams } from "react-router-dom";

import { getTypologyIcon } from "@/api/mappers/typology.mapper";
import ArrowBackIcon from "@/assets/icons/arrow_back.svg?react";
import EqualizerIcon from "@/assets/icons/equalizer.svg?react";
import HeartIcon from "@/assets/icons/favorite.svg?react";
import SkullOutlineIcon from "@/assets/icons/skull_outline.svg?react";
import StarIcon from "@/assets/icons/star.svg?react";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import PokemonCard from "@/components/PokemonCard/PokemonCard";
import Button from "@/components/ui/Button/Button";
import TextBlock from "@/components/ui/TextBlock/TextBlock";
import { usePokemon } from "@/hooks/pokemon/usePokemon";
import { isApiClientError, isGlobalError } from "@/lib/errors";
import { getCardStatus } from "@/utils/getCardStatus";

import styles from "./DetailPage.module.scss";

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: pokemon, isLoading, isError, error } = usePokemon(id);

  const isLocalError = isError && !isGlobalError(error);
  const is404 = isApiClientError(error) && error.status === 404;

  // Redirect to 404 page if pokemon not found
  if (is404) {
    navigate("/404", { replace: true });
    return null;
  }

  const errorMessage = isApiClientError(error)
    ? error.message
    : "Something went wrong. Please try again.";

  if (isLoading) return <LoadingOverlay />;

  const cardStatus = pokemon ? getCardStatus(pokemon.healthPoints) : "default";

  const typologyIcon = pokemon
    ? getTypologyIcon(pokemon.typology.iconName, pokemon.typology.iconUrl)
    : null;

  const vulnerabilityIcon = pokemon ? (
    <img
      src={pokemon.vulnerability.iconUrl}
      alt="vulnerability"
      style={{ width: "100%", height: "100%" }}
    />
  ) : null;

  const widgetItems = pokemon
    ? [
        { icon: <EqualizerIcon />, label: `LV. ${pokemon.level}` },
        { icon: vulnerabilityIcon, label: `VUL. ${pokemon.vulnerability.value}` },
        {
          icon: cardStatus === "expired" ? <SkullOutlineIcon /> : <HeartIcon />,
          label: `PS. ${pokemon.healthPoints}`,
          status: cardStatus,
        },
      ]
    : [];

  return (
    <div className={styles.page}>
      {/* Hero banner */}
      {pokemon && (
        <div className={styles.hero} style={{ backgroundImage: `url(${pokemon.imageUrl})` }} />
      )}

      {/* Main content panel */}
      <div className={styles.panel}>
        <div className="container">
          <div className={styles.panel__inner}>
            {/* Left column — text content */}
            <div className={styles.panel__content}>
              <button className={styles.panel__back} onClick={() => navigate(-1)}>
                <ArrowBackIcon />
              </button>

              {isLocalError && (
                <TextBlock
                  variant="empty"
                  description={errorMessage}
                  className={styles["textBlock--error"]}
                />
              )}

              {pokemon && (
                <>
                  <h1 className={styles.panel__title}>
                    {pokemon.name}
                    <span className={styles.panel__subtitle}> | {pokemon.subtitle}</span>
                  </h1>

                  {/* Long description — sanitized HTML */}
                  <div
                    className={styles.panel__description}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(pokemon.longDescription),
                    }}
                  />
                </>
              )}
            </div>

            {/* Right column — card + CTA */}
            {pokemon && (
              <div className={styles.panel__card}>
                <PokemonCard
                  variant="full"
                  number={pokemon.cardNumber}
                  name={pokemon.name}
                  description={pokemon.shortDescription}
                  imageSrc={pokemon.imageUrl}
                  typologyName={pokemon.typology.name}
                  typologyIcon={typologyIcon}
                  footerLabel={pokemon.rarity.replace(/_/g, " ").toUpperCase()}
                  footerIcons={[typologyIcon, <StarIcon />]}
                  items={widgetItems}
                  status={cardStatus}
                />
                <Button onClick={() => {}} status="active">
                  SIMULA COMBATTIMENTO
                </Button>
              </div>
            )}
          </div>

          {/* Related — placeholder image until endpoint is implemented */}
          {pokemon && (
            <div className={styles.related}>
              <img
                src={pokemon.extraDetails}
                alt="Extra details"
                className={styles.related__image}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
