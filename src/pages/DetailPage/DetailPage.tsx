import { useQueryClient } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ArrowBackIcon from "@/assets/icons/arrow_back.svg?react";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import PokemonCard from "@/components/PokemonCard/PokemonCard";
import Button from "@/components/ui/Button/Button";
import ProgressBar from "@/components/ui/ProgressBar/ProgressBar";
import TextBlock from "@/components/ui/TextBlock/TextBlock";
import { jobKeys } from "@/hooks/jobs/keys";
import { useJob } from "@/hooks/jobs/useJob";
import { useStartJob } from "@/hooks/jobs/useStartJob";
import { pokemonKeys } from "@/hooks/pokemon/keys";
import { usePokemon } from "@/hooks/pokemon/usePokemon";
import { usePokemonCardCombat } from "@/hooks/viewModels/usePokemonCardCombat.viewmodel";
import { isApiClientError, isGlobalError } from "@/lib/errors";

import styles from "./DetailPage.module.scss";

type CombatState = "idle" | "queued" | "running" | "done" | "failed";

export default function DetailPage() {
  const [jobId, setJobId] = useState<string | undefined>(undefined);

  // --- ROUTING ---
  const { id: pokemonId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // --- DATA ---
  const qc = useQueryClient();
  const pokemonQuery = usePokemon(pokemonId);
  const pokemon = pokemonQuery.data;
  const startJob = useStartJob();
  const jobQuery = useJob(jobId);
  const combatInfo = {
    progress: jobQuery.data?.progress,
    status: jobQuery.data?.status,
    isFighting: jobQuery.data?.status === "running" || jobQuery.data?.status === "queued",
    state: jobId == null ? "idle" : ((jobQuery.data?.status ?? "queued") as CombatState),
  };

  // --- ERROR HANDLING ---
  const isLocalPokemonError = pokemonQuery.isError && !isGlobalError(pokemonQuery.error);
  const isLocalStartJobError = startJob.isError && !isGlobalError(startJob.error);
  const isLocalUseJobError = jobQuery.isError && !isGlobalError(jobQuery.error);
  const is404 = isApiClientError(pokemonQuery.error) && pokemonQuery.error.status === 404;
  const pokemonErrorMessage = isApiClientError(pokemonQuery.error)
    ? pokemonQuery.error.message
    : undefined;
  const startJobErrorMessage = isApiClientError(startJob.error)
    ? startJob.error.message
    : undefined;
  const useJobErrorMessage = isApiClientError(jobQuery.error) ? jobQuery.error.message : undefined;

  // --- SIDE EFFECTS ---
  useEffect(() => {
    if (!pokemonId) return;
    if (jobQuery.data?.status === "done") {
      qc.invalidateQueries({ queryKey: pokemonKeys.detail(pokemonId) });
    }
  }, [jobQuery.data?.status, pokemonId, qc]);

  useEffect(() => {
    if (is404) navigate("/404", { replace: true });
  }, [is404, navigate]);

  // --- MEMOS ---
  const longDescription = pokemon?.longDescription;
  const sanitizedLongDescription = useMemo(
    () => DOMPurify.sanitize(longDescription ?? ""),
    [longDescription],
  );

  // --- POKEMON CARD RENDERING DETAILS ---
  const cardVm = usePokemonCardCombat({
    pokemon,
    job: jobQuery.data,
    isLocalStartJobError,
    isLocalUseJobError,
    startJobErrorMessage,
    useJobErrorMessage,
    jobId,
  });

  // --- GUARDS ---
  if (!pokemonId) return null;
  if (is404) return null;
  if (pokemonQuery.isLoading) return <LoadingOverlay />;

  // --- COMBAT FEATURE HANDLING ---
  const handleCombatStart = () => {
    if (combatInfo.isFighting) return;

    if (cardVm.effectiveStatus === "expired") {
      window.location.reload();
      return;
    }

    if (jobId) qc.removeQueries({ queryKey: jobKeys.byId(jobId) });
    setJobId(undefined);

    startJob.mutate(
      { itemId: pokemonId },
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
                        __html: sanitizedLongDescription,
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
                      typologyIcon={cardVm.typologyIcon}
                      footerLabel={pokemon.rarity.replace(/_/g, " ").toUpperCase()}
                      footerIcons={cardVm.footerIcons}
                      items={cardVm.widgetItems}
                      status={cardVm.effectiveStatus}
                      showErrorOverlay={cardVm.showErrorOverlay}
                      errorOverlayText={cardVm.errorOverlayText}
                    />
                    <div className={styles["panel__top-right-pokemon-card-progress"]}>
                      {cardVm.progressToShow != null ? (
                        <ProgressBar progress={cardVm.progressToShow} />
                      ) : (
                        <>È tutto pronto, inizia la sfida!</>
                      )}
                    </div>
                  </div>
                  <Button
                    className={styles["panel__top-right-fight-button"]}
                    onClick={handleCombatStart}
                    status={combatInfo.isFighting ? "disabled" : "active"}
                  >
                    {cardVm.buttonLabel}
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
