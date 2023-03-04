export interface IsActiveMatchOptions {
  matrixParams: 'exact' | 'subset' | 'ignored'
  queryParams: 'exact' | 'subset' | 'ignored'
  paths: 'exact' | 'subset'
  fragment: 'exact' | 'ignored'
}
