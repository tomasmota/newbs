import { useApi } from '@backstage/core-plugin-api';
import React from 'react';
import useAsync from 'react-use/lib/useAsync';
import { pulsarApiRef } from '../../api/types';
import { Select, SelectItem } from '@backstage/core-components';

export const TopicPicker = ( props: {
  onChange: (topic: string) => void;
}) => {
  const pulsarApi = useApi(pulsarApiRef);

  const { value, loading, error } = useAsync(async () => {
    const topics = await pulsarApi.getTopics();

    const items: SelectItem[] = topics.map(i => ({ label: i.name, value: i.name }))
    return items;
  }, []);

  return (
    <>
      <Select
        native
        label="Topics"
        onChange={selected =>
          console.log(selected)
          // setTopic(String(Array.isArray(selected) ? selected[0] : selected))
        }
        items={
          loading ? [{ label: 'Loading...', value: 'loading' }] : value || []
        }
      />
    </>
  );
};
