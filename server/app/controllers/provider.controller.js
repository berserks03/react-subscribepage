const db = require("../models");
const Provider = db.providers;
const Op = db.Sequelize.Op;
const Json2csvParser = require('json2csv').Parser;

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: providers } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, providers, totalPages, currentPage };
};

// Create and Save a new Provider
exports.create = (req, res) => {
  // Validate request
  if (!req.body.provider) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Provider
  const provider = {
    provider: req.body.provider,
    email: req.body.email,
    selected: req.body.selected ? req.body.selected : false
  };

  // Save Provider in the database
  Provider.create(provider)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Provider."
      });
    });
};

// Retrieve all Providers from the database.
exports.findAll = (req, res) => {
  const { page, size, provider } = req.query;
  var condition = provider ? { provider: { [Op.like]: `%${provider}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  Provider.findAndCountAll({ where: condition, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving providers."
      });
    });
};

// Find a single Provider with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Provider.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Provider with id=" + id
      });
    });
};

// Update a Provider by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Provider.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `Provider with id=${id} was updated successfully.`
        });
      } else {
        res.send({
          message: `Cannot update Provider with id=${id}. Maybe Provider was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Provider with id=" + id
      });
    });
};

// Delete a Provider with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Provider.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Provider was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Provider with id=${id}. Maybe Provider was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Provider with id=" + id
      });
    });
};

// Delete all Providers from the database.
exports.deleteAll = (req, res) => {
  Provider.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Providers were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all providers."
      });
    });
};

// Find all selected Providers
exports.findAllSelected = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  Provider.findAndCountAll({ where: { selected: true }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving providers."
      });
    });
};

exports.downloadFile = (req, res) => {
  Provider.findAll({where: { selected: true }, attributes: ['id', 'provider', 'email', 'selected', 'date']}).then(objects => {
      const jsonProviders = JSON.parse(JSON.stringify(objects));
      const csvFields = ['Id', 'Provider', 'Email', 'Selected', 'Date'];
      const json2csvParser = new Json2csvParser({ csvFields });
      const csvData = json2csvParser.parse(jsonProviders);

      res.setHeader('Content-disposition', 'attachment; filename=providers.csv');
      res.set('Content-Type', 'text/csv');
      res.status(200).end(csvData);
  });
}
