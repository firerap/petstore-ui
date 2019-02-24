import { MatDialogConfig } from '@angular/material';

export namespace ModalState {
  interface ModalPropsDefault {
    modalName?: string;
  }

  export interface IOptions<T = any> {
    cmpType: any;
    props?: T & ModalPropsDefault;
    modalOptions?: MatDialogConfig;
  }

  export interface IState {
    /**
     * Whether modal is open or not
     */
    open: boolean;
    /**
     * Component to open
     */
    cmpType?: any;
    /**
     * Title of the modal
     */
    title?: string;
    /**
     * Latest result passed back when the modal closed (if any)
     */
    latestResult?: any;
  }

  export const initialState: IState = {
    open: false,
  };
}
