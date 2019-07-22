
exports.seed = function(knex) {
  return knex('actions').truncate()
    .then(function () {
      return knex('actions').insert([
        {id: 1, 
          task: 'action 1 description', 
          notes: 'action1 note', 
          action_complete: false,
          project_id: 1
        },
        {id: 2, 
          task: 'action 2 another description', 
          notes: 'action2 note', 
          action_complete: false,
          project_id: 1
        },
        {id: 3, 
          task: 'action 3 yet another description', 
          action_complete: false,
          project_id: 1
        }
      ]);
    });
};
