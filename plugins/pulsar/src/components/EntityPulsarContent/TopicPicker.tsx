import { useApi } from '@backstage/core-plugin-api';
import React, { Dispatch, SetStateAction } from 'react';
import useAsync from 'react-use/lib/useAsync';
import { pulsarApiRef } from '../../api/types';
import { Select, SelectItem } from '@backstage/core-components';

export const TopicPicker = (props: {
  onChange: Dispatch<SetStateAction<string>>;
}) => {
  const { onChange } = props;
  const pulsarApi = useApi(pulsarApiRef);

  const { value, loading, error } = useAsync(async () => {
    const topics = await pulsarApi.getTopics();

    onChange(topics[0].fullName);
    const items: SelectItem[] = topics.map(t => ({
      label: t.fullName,
      value: t.fullName,
    }));
    return items;
  }, []);

  return (
    <>
      {!error && (
        <Select
          native
          label="Topics"
          onChange={selected =>
            onChange(String(Array.isArray(selected) ? selected[0] : selected))
          }
          items={
            loading ? [{ label: 'Loading...', value: 'loading' }] : value || []
          }
        />
      )}
    </>
  );
};
