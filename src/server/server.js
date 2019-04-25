"use strict";

import express from "express";
import { getFormDefinition } from "./services/form/form_service";
const port = process.env.PORT || 3001;

const app = express();

app.use(express.static("public"));
app.get("/api/getFormDefinition/:formId", (req, res) =>  res.send({formDef: getFormDefinition(req.params.formId)}));
app.listen(port, () => console.log(`Listening on port ${port}!`)); // eslint-disable-line no-console

export default app;
