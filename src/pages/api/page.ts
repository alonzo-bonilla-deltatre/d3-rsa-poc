// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Metadata, StructureItem } from '@/models/types/pageStructure';
import type { NextApiRequest, NextApiResponse } from 'next';
import { indexStructure } from '../../__mocks__/pageStructures';

type DataType = {
  data: {
    structure: StructureItem,
    variables: {
      type: string;
      key: string;
      keyValue: {
        value: string | boolean | number;
        valueType: string;
      };
    }[],
    metadata:Metadata[];
  };
  meta: {
    version: string;
  };
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataType | {}>
) {
  res.status(200).json(indexStructure);
}
