import { GlobalProvider } from "./globalContext";
import { UserProvider } from "./userContext";

const composeProviders =
  (...providers: any) =>
    (props: any) =>
      providers.reduceRight(
        (children: any, Provider: any) => <Provider {...props}>{children}</Provider>,
        props.children
      );

export const AllProviders = composeProviders(
  // CONTEXTOS 
  UserProvider,
  GlobalProvider
);