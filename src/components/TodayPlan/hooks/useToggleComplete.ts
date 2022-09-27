import { pick } from 'lodash';
import { useCallback } from 'react';

import { useMultipleCreateOrUpdatePlansMutation } from '@src/operations/mutations/multipleCreateOrUpdatePlans';
import { Plan } from '@src/types/graphql';

const useToggleComplete = (
  plan: Plan,
): {
  loading: boolean;
  onToggleComplete: () => Promise<void>;
  onToggleVolumeComplete: (volumeId: string) => Promise<void>;
} => {
  const [multipleCreateOrUpdatePlans, { loading }] =
    useMultipleCreateOrUpdatePlansMutation();
  const complete =
    plan.volumes && !plan.volumes.every(volume => volume.complete);

  const onToggleComplete = useCallback(async () => {
    await multipleCreateOrUpdatePlans({
      variables: {
        inputs: [
          {
            _id: plan._id,
            plannedAt: plan.plannedAt,
            training: plan.training._id,
            volumes:
              plan.volumes?.map(volume => ({
                ...pick(volume, [
                  '_id',
                  'count',
                  'distances',
                  'times',
                  'weight',
                ]),
                complete,
              })) || [],
          },
        ],
      },
    });
  }, [multipleCreateOrUpdatePlans, plan, complete]);

  const onToggleVolumeComplete = useCallback(
    async volumeId => {
      await multipleCreateOrUpdatePlans({
        variables: {
          inputs: [
            {
              _id: plan._id,
              plannedAt: plan.plannedAt,
              training: plan.training._id,
              volumes:
                plan.volumes?.map(volume => ({
                  ...pick(volume, ['_id']),
                  complete:
                    volume._id === volumeId
                      ? !volume.complete
                      : volume.complete,
                })) || [],
            },
          ],
        },
      });
    },
    [multipleCreateOrUpdatePlans, plan],
  );

  return { loading, onToggleComplete, onToggleVolumeComplete };
};

export default useToggleComplete;
