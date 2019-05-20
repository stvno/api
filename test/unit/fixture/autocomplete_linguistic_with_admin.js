module.exports = {
  'query': {
    'bool': {
      'must': [
        {
          'multi_match': {
            'fields': ['name.default^1', 'name.en^2'],
            'analyzer': 'peliasQueryFullToken',
            'query': 'one two',
            'cutoff_frequency': 0.01,
            'type': 'phrase',
            'operator': 'and',
            'slop': 3
          }
        }
      ],
      'should': [
        {
          'match': {
            'parent.country.ngram': {
              'analyzer': 'peliasAdmin',
              'boost': 800,
              'cutoff_frequency': 0.01,
              'query': 'three'
            }
          }
        },
        {
          'match': {
            'parent.region.ngram': {
              'analyzer': 'peliasAdmin',
              'cutoff_frequency': 0.01,
              'boost': 600,
              'query': 'three'
            }
          }
        },
        {
          'match': {
            'parent.region_a.ngram': {
              'analyzer': 'peliasAdmin',
              'cutoff_frequency': 0.01,
              'boost': 600,
              'query': 'three'
            }
          }
        },
        {
          'match': {
            'parent.county.ngram': {
              'analyzer': 'peliasAdmin',
              'cutoff_frequency': 0.01,
              'boost': 400,
              'query': 'three'
            }
          }
        },
        {
          'match': {
            'parent.borough.ngram': {
              'analyzer': 'peliasAdmin',
              'cutoff_frequency': 0.01,
              'boost': 600,
              'query': 'three'
            }
          }
        },
        {
          'match': {
            'parent.localadmin.ngram': {
              'analyzer': 'peliasAdmin',
              'cutoff_frequency': 0.01,
              'boost': 200,
              'query': 'three'
            }
          }
        },
        {
          'match': {
            'parent.locality.ngram': {
              'analyzer': 'peliasAdmin',
              'cutoff_frequency': 0.01,
              'boost': 200,
              'query': 'three'
            }
          }
        },
        {
          'match': {
            'parent.neighbourhood.ngram': {
              'analyzer': 'peliasAdmin',
              'cutoff_frequency': 0.01,
              'boost': 200,
              'query': 'three'
            }
          }
        },
        {
          'match': {
            'phrase.default': {
              'analyzer' : 'peliasPhrase',
              'cutoff_frequency': 0.01,
              'type' : 'phrase',
              'boost' : 1,
              'slop' : 3,
              'query' : 'one two'
            }
          }
        },
        {
          'function_score': {
            'query': {
              'match_all': {}
            },
            'max_boost': 20,
            'functions': [
              {
                'field_value_factor': {
                  'modifier': 'log1p',
                  'field': 'popularity',
                  'missing': 1
                },
                'weight': 1
              }
            ],
            'score_mode': 'first',
            'boost_mode': 'replace'
          }
        },
        {
          'function_score': {
            'query': {
              'match_all': {}
            },
            'max_boost': 20,
            'functions': [
              {
                'field_value_factor': {
                  'modifier': 'log1p',
                  'field': 'population',
                  'missing': 1
                },
                'weight': 3
              }
            ],
            'score_mode': 'first',
            'boost_mode': 'replace'
          }
        }
      ]
    }
  },
  'size': 20,
  'track_scores': true,
  'sort': [
    '_score'
  ]
};
