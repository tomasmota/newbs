import { useApi } from '@backstage/core-plugin-api';
import React from 'react';
import useAsync from 'react-use/lib/useAsync';
import { pulsarApiRef, Topic } from '../../api/types';
import { Select, WarningPanel } from '@backstage/core-components';

/** @public */
export type TopicPickerProps = {
  selectedTopic: Topic | undefined;
  setSelectedTopic: (value: Topic) => void;
};

/** @public */
export const TopicPicker = ({
  selectedTopic,
  setSelectedTopic,
}: TopicPickerProps) => {
  const pulsarApi = useApi(pulsarApiRef);

  const { value, loading, error } = useAsync(async () => {
    console.log('fetching all topics');
    const topics = await pulsarApi.getTopics();
    setSelectedTopic(topics[0]);
    return topics;
  }, []);

  return (
    <>
      {!loading && error && (
        //TODO: test this out
        <WarningPanel
          title="Failed to fetch Pulsar topics information"
          message={error?.message}
        />
      )}

      {!error && value !== undefined && (
        <Select
          native
          label="Topics"
          onChange={selected => {
            const s = String(Array.isArray(selected) ? selected[0] : selected);
            setSelectedTopic(value.find(t => t.fullName === s)!);
          }}
          selected={selectedTopic?.fullName || value[0].fullName}
          items={
            loading
              ? [{ label: 'Loading...', value: 'loading' }]
              : value.map(t => ({
                  label: t.fullName,
                  value: t.fullName,
                })) || []
          }
        />
      )}
    </>
  );
};
