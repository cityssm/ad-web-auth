export interface Config {

  ports?: {
    http?: number;
    https?: number;
  };

  methods?: {
    get?: false | MethodConfig;
    post?: false | MethodConfig;
  };
}


export interface MethodConfig {
  userNameField: string;
  passwordField: string;
}
