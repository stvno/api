module.exports = {
  'query': {
    'bool': {
      'must': [
      {
        'multi_match': {
          'fields': ['name.default^1', 'name.en^1'],
          'analyzer': 'peliasQueryFullToken',
          'query': 'one two',
          'cutoff_frequency': 0.01,
          'type': 'phrase',
          'operator': 'and',
          'slop': 3
        }
      },
      {
        'constant_score': {
          'query': {
            'multi_match': {
              'fields': ['name.default^100', 'name.en^100'],
              'analyzer': 'peliasQueryPartialToken',
              'query': 'three',
              'cutoff_frequency': 0.01,
              'type': 'phrase',
              'operator': 'and',
              'slop': 3
            }
          }
        }
      }],
      'should':[
        {
          'multi_match': {
            'fields': ['phrase.default^1', 'phrase.en^1'],
            'operator': 'and',
            'analyzer' : 'peliasPhrase',
            'type' : 'phrase',
            'slop' : 3,
            'cutoff_frequency': 0.01,
            'query' : 'one two'
          }
        },
        {
        'function_score': {
          'query': {
            'match_all': {}
          },
          'max_boost': 20,
          'score_mode': 'first',
          'boost_mode': 'replace',
          'functions': [{
            'field_value_factor': {
              'modifier': 'log1p',
              'field': 'popularity',
              'missing': 1
            },
            'weight': 1
          }]
        }
      },{
        'function_score': {
          'query': {
            'match_all': {}
          },
          'max_boost': 20,
          'score_mode': 'first',
          'boost_mode': 'replace',
          'functions': [{
            'field_value_factor': {
              'modifier': 'log1p',
              'field': 'population',
              'missing': 1
            },
            'weight': 3
          }]
        }
      }]
    }
  },
  'sort': [ '_score' ],
  'size': 20,
  'track_scores': true
};
