import { epilot } from "@epilot/app-bridge";
import { useEffect, useMemo, useState } from "react";
import { useEntity } from "./hooks/useEntity";
import { NoResultAvailable } from "./components/NoResultAvailable";
import { ScoreCard } from "./components/ScoreCard";
import { ScoreCardSkeleton } from "./components/ScoreCardSkeleton";
import { ErrorCard } from "./components/ErrorCard";

export function App () {
  
  // TODO the context should be typed through our app bridge oss package
  const [ctx, setCtx] = useState<any>(null);

  const entityQuery = useEntity({ id: ctx?.entityId, slug: 'contact' });

  const scoreIsPresent = useMemo(() => entityQuery.data?.entity?.score_value, [entityQuery.data]);

  const score = useMemo(() => {
    return {
      "score_value": entityQuery.data?.entity?.score_value,
      "score_range": entityQuery.data?.entity?.score_range,
      "schufa_text": entityQuery.data?.entity?.schufa_text,
      "schufa_risk_rate": entityQuery.data?.entity?.schufa_risk_rate,
      "schufa_info_text": entityQuery.data?.entity?.schufa_info_text,
      "score_timestamp": entityQuery.data?.entity?.score_timestamp
    }
  }, [entityQuery.data]);

  useEffect(() => {
    const unsubscribe = epilot.subscribeToParentMessages('init-context', (message) => {
      console.log('[epilot-schufa-app] Received init-context message:', message.data?.context);

      if(message.data.context) {
        console.log('[epilot-schufa-app] Setting context:', message.data.context);
        setCtx(message.data.context);
      }
    });

    epilot.sendMessageToParent('init-context', {});

    return () => {
      unsubscribe();
    }
  }, []);

  if(entityQuery.isLoading) return <ScoreCardSkeleton />;

  return (
    <div>
      {entityQuery.isError ? <ErrorCard error={entityQuery.error} /> : null}

      {entityQuery.isSuccess && !scoreIsPresent ? <NoResultAvailable /> : null}

      {entityQuery.isSuccess && scoreIsPresent ? <ScoreCard score={score} /> : null}
    </div>
  );
}