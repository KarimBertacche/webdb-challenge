
exports.seed = function(knex) {
  return knex('projects').truncate()
    .then(function () {
      return knex('projects').insert([
        {id: 1, 
          project_name: 'project 1', 
          description: 'project description',
          project_complete: false
        }
      ]);
    });
};
