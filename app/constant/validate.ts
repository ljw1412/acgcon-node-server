export const baseRule = {
  acgType: {
    type: 'enum',
    values: ['animation', 'comic', 'game'],
    required: true
  },
  subType: { type: 'string', required: true }
};
