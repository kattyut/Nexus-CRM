import entityData from './{{fixture_json_file_name}}';

export const testData = {
  {{entity_collection_name}}: entityData.{{entity_collection_name}},
  invalid{{entity_pascal_name}}: entityData.invalid
};

export type {{entity_pascal_name}}TestData = (typeof testData.{{entity_collection_name}})[number];
