import { DetailedHTMLProps, FormHTMLAttributes } from 'react';

export default interface ReviewFormProps
  extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  productId: string;
}
