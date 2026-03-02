import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
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
import { useJob } from "@/hooks/jobs/useJob";
import { useStartJob } from "@/hooks/jobs/useStartJob";
import { usePokemon } from "@/hooks/pokemon/usePokemon";
import { isApiClientError, isGlobalError } from "@/lib/errors";
import { getCardStatus } from "@/utils/getCardStatus";

import styles from "./DetailPage.module.scss";

export default function DetailPage() {
  const [jobId, setJobId] = useState<string | undefined>(undefined);

  // --- ROUTING ---
  const { id: pokemonId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // --- DATA ---
  const pokemonQuery = usePokemon(pokemonId);
  const pokemon = pokemonQuery.data;
  const startJob = useStartJob();
  const jobQuery = useJob(jobId);

  // --- ERROR HANDLING ---
  const isLocalPokemonError = pokemonQuery.isError && !isGlobalError(pokemonQuery.error);
  const isLocalStartJobError = startJob.isError && !isGlobalError(startJob.error);
  const isLocalUseJobError = jobQuery.isError && !isGlobalError(jobQuery.error);
  const is404 = isApiClientError(pokemonQuery.error) && pokemonQuery.error.status === 404;

  useEffect(() => {
    if (is404) navigate("/404", { replace: true });
  }, [is404, navigate]);

  if (is404) return null;

  const pokemonErrorMessage = isApiClientError(pokemonQuery.error)
    ? pokemonQuery.error.message
    : "Something went wrong. Please try again.";
  const startJobErrorMessage = isApiClientError(startJob.error)
    ? startJob.error.message
    : "Something went wrong. Please try again.";
  const useJobErrorMessage = isApiClientError(jobQuery.error)
    ? jobQuery.error.message
    : "Something went wrong. Please try again.";

  if (pokemonQuery.isLoading) return <LoadingOverlay />;

  // --- POKEMON CARD RENDERING DETAILS ---
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

  // --- COMBAT FEATURE HANDLING ---

  const handleCombatStart = () => {
    startJob.mutate(
      { itemId: pokemonId! },
      {
        onSuccess: (data) => {
          setJobId(data.job_id);
        },
      },
    );
  };

  return (
    <section className={styles.page}>
      {/* Hero banner */}
      {pokemon && (
        <div className={styles.hero} style={{ backgroundImage: `url(${pokemon.imageUrl})` }} />
      )}

      {/* Main content panel */}
      <div className="container">
        <div className={styles.panel}>
          <div className={styles.panel__inner}>
            <div className={styles.panel__top}>
              {/* Left column — text content */}
              <div className={styles["panel__top-left"]}>
                <div>
                  <Button onClick={() => navigate(-1)} status="active">
                    <ArrowBackIcon />
                  </Button>
                </div>

                {isLocalPokemonError && (
                  <TextBlock
                    variant="empty"
                    description={pokemonErrorMessage}
                    className={styles["textBlock--error"]}
                  />
                )}

                {pokemon && (
                  <>
                    <h2 className={styles["panel__top-left-title"]}>
                      {pokemon.name}
                      <span className={styles["panel__top-left-title--muted"]}>
                        {" "}
                        | {pokemon.subtitle}
                      </span>
                    </h2>

                    {/* Long description — sanitized HTML */}
                    <div
                      className={styles["panel__top-left-description"]}
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(pokemon.longDescription),
                      }}
                    />
                  </>
                )}
              </div>

              {/* Right column — card + CTA */}
              {pokemon && (
                <div className={styles["panel__top-right"]}>
                  <div className={styles["panel__top-right-pokemon-card"]}>
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
                    {isLocalStartJobError && <span>{startJobErrorMessage}</span>}
                    {isLocalUseJobError && <span>{useJobErrorMessage}</span>}
                  </div>
                  <Button
                    className={styles["panel__top-right-fight-button"]}
                    onClick={handleCombatStart}
                    status="active"
                  >
                    SIMULA COMBATTIMENTO
                  </Button>
                </div>
              )}
            </div>

            {/* Related — placeholder image as specified in the instructions */}
            {pokemon && (
              <div className={styles.panel__bottom}>
                <img
                  src={pokemon.extraDetails}
                  alt="Extra details"
                  className={styles["panel__bottom-image"]}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
