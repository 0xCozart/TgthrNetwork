const aliases = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Tgthr',
  type: 'object',
  descripton: 'Holds DIDs Tgthr users pods, posts, and interactions',
  properties: {
    pods: {
      type: 'object',
      title: 'Pods'
    }
  }
};

export default aliases;
