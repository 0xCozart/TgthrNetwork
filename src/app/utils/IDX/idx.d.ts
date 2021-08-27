import Ceramic from '@ceramicnetwork/http-client';
import { IDX } from '@ceramicstudio/idx';

export interface CeramicIDX {
  ceramic: Ceramic | null;
  idx: IDX | null;
}
