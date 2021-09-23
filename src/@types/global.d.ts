import { ComponentType } from 'react';
import 'react-redux';

/** Global definitions for development **/

declare module 'authereum';
declare module 'fortmatic';
declare module 'web3modal';
declare module 'react-redux';
declare module '3id-connect';
declare module 'react-router-dom';

// for style loader
declare module '*.css' {
  const styles: any;
  export = styles;
}

// Omit type https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-377567046
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type PartialPick<T, K extends keyof T> = Partial<T> & Pick<T, K>;

declare module 'react-redux' {
  // Add removed inferrable type to support connect as decorator
  // https://github.com/DefinitelyTyped/DefinitelyTyped/pull/16652
  export interface InferableComponentDecorator<TOwnProps> {
    <T extends ComponentType<TOwnProps>>(component: T): T;
  }

  // overload connect interface to return built-in ClassDecorator
  // https://github.com/reactjs/react-redux/pull/541#issuecomment-269197189
  export interface Connect {
    <TStateProps = any, TDispatchProps = any, TOwnProps = any, TMergedProps = any, State = any>(
      mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
      mapDispatchToProps?: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
      mergeProps?: MergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps>,
      options?: Options
    ): InferableComponentDecorator<TOwnProps>;
  }
}
