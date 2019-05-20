module.exports = {
  'query': {
    'bool': {
      'must': [{
        'multi_match': {
          'fields': ['name.default^1', 'name.en^2'],
          'analyzer': 'peliasQueryFullToken',
          'query': 'one',
          'cutoff_frequency': 0.01,
          'type': 'phrase',
          'operator': 'and',
          'slop': 3
        }
      }],
      'should':[{
        'match': {
          'phrase.default': {
            'analyzer': 'peliasPhrase',
            'cutoff_frequency': 0.01,
            'boost': 1,
            'slop': 3,
            'query': 'one',
            'type': 'phrase'
          }
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
