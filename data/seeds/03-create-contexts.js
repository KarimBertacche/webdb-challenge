
exports.seed = function(knex) {
  return knex('contexts').truncate()
    .then(function () {
      return knex('contexts').insert([
        {id: 1, context_type: 'Home', action_id: 2},
        {id: 2, context_type: 'Work', action_id: 2},
        {id: 3, context_type: 'Online', action_id: 2},
        {id: 4, context_type: 'Home', action_id: 3}
      ]);
    });
};
