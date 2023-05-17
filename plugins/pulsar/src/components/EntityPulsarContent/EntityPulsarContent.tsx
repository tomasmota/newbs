import React, { useState } from 'react';
import { useEntity } from '@backstage/plugin-catalog-react';
import {
  Content,
  ContentHeader,
  SupportButton,
} from '@backstage/core-components';
import { TopicPicker } from './TopicPicker';
import { TopicStatsContent } from './TopicStatsContent';
import { Topic } from '../../api/types';

// TODO: Annotation should be producer/subscriber name instead of a topic
// For now keep annotation around but the content is actaully not being used,
// we are looking at all topics
const ANNOTATION_PULSAR_TOPIC = 'backstage.io/pulsar-topic';

/** @public */
export const EntityPulsarContent = () => {
  const { entity } = useEntity();
  const pulsarAnnotation =
    entity.metadata.annotations?.[ANNOTATION_PULSAR_TOPIC]?.trim();
  const isPulsarConfigured = Boolean(pulsarAnnotation);

  const [topic, setTopic] = useState<Topic>();

  return (
    <Content>
      <ContentHeader title="Pulsar Topic Information">
        <SupportButton />
      </ContentHeader>

      {isPulsarConfigured && (
        <>
          <TopicPicker
            selectedTopic={topic}
            setSelectedTopic={setTopic}
          ></TopicPicker>
          {topic !== undefined && (
            <TopicStatsContent topic={topic}></TopicStatsContent>
          )}
        </>
      )}
    </Content>
  );
};
