declare module "react-github-login" {
  import { ReactNode, ComponentType } from "react";

  interface GitHubLoginProps {
    clientId: string;
    redirectUri?: string;
    scope?: string;
    onSuccess: (response: GitHubSuccessResponse) => void;
    onFailure: (error: GitHubErrorResponse) => void;
    buttonText?: string;
    className?: string;
    children?: ReactNode;
  }

  interface GitHubSuccessResponse {
    code: string;
  }

  interface GitHubErrorResponse {
    error: string;
    error_description?: string;
    error_uri?: string;
  }

  const GitHubLogin: ComponentType<GitHubLoginProps>;
  export default GitHubLogin;
  export type { GitHubLoginProps, GitHubSuccessResponse, GitHubErrorResponse };
}
