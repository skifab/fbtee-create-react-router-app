import { use } from "react";

export const AboutSection: React.FC<{slowDataPromise: Promise<string>}> = ( { slowDataPromise } ) => {

  const slowData = use(slowDataPromise);

  return (
    <p>{slowData}</p>
  );
}

