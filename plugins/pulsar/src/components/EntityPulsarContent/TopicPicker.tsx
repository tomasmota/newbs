import { useApi } from '@backstage/core-plugin-api';
import React, { Dispatch, SetStateAction } from 'react';
import useAsync from 'react-use/lib/useAsync';
import { pulsarApiRef, Topic } from '../../api/types';
import { Select } from '@backstage/core-components';

export const TopicPicker = (props: {
  onChange: Dispatch<SetStateAction<Topic | undefined>>;
}) => {
  const { onChange } = props;
  const pulsarApi = useApi(pulsarApiRef);

  const { value, loading, error } = useAsync(async () => {
    const topics = await pulsarApi.getTopics();
    onChange(topics[0]);
    return topics;
  }, []);

  return (
    <>
      {!error && value !== undefined && (
        <Select
          native
          label="Topics"
          onChange={selected => {
            const s = String(Array.isArray(selected) ? selected[0] : selected);
            onChange(value.find(t => t.fullName === s)!);
          }}
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
