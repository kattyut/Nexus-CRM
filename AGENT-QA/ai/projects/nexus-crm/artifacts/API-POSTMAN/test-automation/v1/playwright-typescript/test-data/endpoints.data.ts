export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type EndpointContract = {
  key: string;
  name: string;
  feature: string;
  hu: string;
  method: HttpMethod;
  path: string;
  functionality: string;
  requiredFields: string[];
  businessRules: string[];
  positiveBody?: Record<string, unknown>;
  updateBody?: Record<string, unknown>;
  idPlaceholder?: string;
  expectedListFields: string[];
  expectedObjectFields: string[];
};

const unique = () => Date.now().toString();

export const endpointContracts: EndpointContract[] = [
  {
    key: 'countries',
    name: 'Countries',
    feature: 'Catalogo de paises',
    hu: 'HU006 - Administrar empresas',
    method: 'GET',
    path: '/Countries',
    functionality: 'Consultar el catalogo de paises usado para ubicar empresas y ciudades.',
    requiredFields: ['name'],
    businessRules: ['El nombre del pais es obligatorio.', 'No deben existir paises duplicados por nombre normalizado.'],
    positiveBody: { name: `Pais QA ${unique()}` },
    updateBody: { id: 'GUID_COUNTRY', name: `Pais QA Editado ${unique()}` },
    idPlaceholder: 'GUID_COUNTRY',
    expectedListFields: ['id', 'name'],
    expectedObjectFields: ['id', 'name']
  },
  {
    key: 'cities',
    name: 'Cities',
    feature: 'Catalogo de ciudades',
    hu: 'HU006 - Administrar empresas',
    method: 'GET',
    path: '/cities',
    functionality: 'Administrar ciudades asociadas a paises para clasificar empresas.',
    requiredFields: ['name', 'countryId'],
    businessRules: ['La ciudad debe estar asociada a un pais existente.', 'No deben existir ciudades duplicadas para el mismo pais.'],
    positiveBody: { name: `Ciudad QA ${unique()}`, countryId: '9b3d04f2-b75f-4115-8bdb-e6441a450006' },
    updateBody: { id: 'GUID_CITY', name: `Ciudad QA Editada ${unique()}`, countryId: 'GUID_COUNTRY' },
    idPlaceholder: 'GUID_CITY',
    expectedListFields: ['id', 'name', 'countryId'],
    expectedObjectFields: ['id', 'name', 'countryId']
  },
  {
    key: 'activity-types',
    name: 'Activity Types',
    feature: 'Catalogo de tipos de actividad',
    hu: 'HU010 - Administrar actividades comerciales',
    method: 'GET',
    path: '/activity-types',
    functionality: 'Administrar tipos de actividad comercial como llamada, correo o reunion.',
    requiredFields: ['name'],
    businessRules: ['El tipo de actividad debe tener nombre.', 'El tipo no debe duplicarse por nombre.'],
    positiveBody: { name: `Llamada QA ${unique()}`, description: 'Seguimiento telefonico QA' },
    updateBody: { id: 'GUID_ACTIVITY_TYPE', name: `Correo QA ${unique()}`, description: 'Seguimiento por correo QA' },
    idPlaceholder: 'GUID_ACTIVITY_TYPE',
    expectedListFields: ['id', 'name'],
    expectedObjectFields: ['id', 'name']
  },
  {
    key: 'activity-levels',
    name: 'Activity Levels',
    feature: 'Catalogo de nivel de actividad',
    hu: 'HU006 - Administrar empresas',
    method: 'GET',
    path: '/activity-levels',
    functionality: 'Administrar niveles de actividad o temperatura comercial de una empresa.',
    requiredFields: ['Code', 'Description'],
    businessRules: ['El codigo del nivel debe ser unico.', 'La descripcion debe explicar la probabilidad o prioridad comercial.'],
    positiveBody: { Code: `QA-${unique()}`, Description: 'Nivel QA' },
    updateBody: { id: 'GUID_LEVEL', name: 'Warm' },
    idPlaceholder: 'GUID_LEVEL',
    expectedListFields: ['id', 'code', 'description'],
    expectedObjectFields: ['id']
  },
  {
    key: 'company-sectors',
    name: 'Company Sectors',
    feature: 'Catalogo de sectores',
    hu: 'HU006 - Administrar empresas',
    method: 'GET',
    path: '/company-sectors',
    functionality: 'Administrar sectores economicos para segmentar empresas.',
    requiredFields: ['name'],
    businessRules: ['El sector debe tener nombre.', 'No deben existir sectores duplicados.'],
    positiveBody: { name: `Sector QA ${unique()}` },
    updateBody: { id: 'GUID_SECTOR', name: `Sector QA Editado ${unique()}` },
    idPlaceholder: 'GUID_SECTOR',
    expectedListFields: ['id', 'name'],
    expectedObjectFields: ['id', 'name']
  },
  {
    key: 'company-statuses',
    name: 'Company Statuses',
    feature: 'Catalogo de estados de empresa',
    hu: 'HU006 - Administrar empresas',
    method: 'GET',
    path: '/company-statuses',
    functionality: 'Administrar estados de empresa como Activa, Inactiva o Sin seguimiento.',
    requiredFields: ['name'],
    businessRules: ['El estado Sin seguimiento es termino formal del sistema.', 'Los estados deben ser consistentes para dashboards y filtros.'],
    positiveBody: { name: `Estado QA ${unique()}` },
    updateBody: { id: 'GUID_STATUS', name: `Estado QA Editado ${unique()}` },
    idPlaceholder: 'GUID_STATUS',
    expectedListFields: ['id', 'name'],
    expectedObjectFields: ['id', 'name']
  },
  {
    key: 'companies',
    name: 'Companies',
    feature: 'Empresas',
    hu: 'HU006 - Administrar empresas / HU007 - Consultar empresas',
    method: 'GET',
    path: '/companies',
    functionality: 'Crear, consultar, actualizar y eliminar empresas del CRM.',
    requiredFields: ['name', 'SectorId', 'StatusId', 'ActivityLevelId', 'cityId'],
    businessRules: ['La empresa debe tener nombre.', 'Sector, estado, nivel de actividad y ciudad deben existir.', 'El sitio web debe tener formato valido cuando se informe.'],
    positiveBody: {
      name: `Empresa QA ${unique()}`,
      website: 'https://qa.example.com',
      SectorId: '2e6548eb-022a-451f-a952-52f908c0f568',
      StatusId: '9295bfda-c368-409a-b55e-4a8690f439e7',
      ActivityLevelId: '212062b2-9efe-40b5-a29d-45499b08952f',
      cityId: '4cd452c5-0a1e-4df2-b3c9-623584cba9d6',
      responsible: 'QA Automation',
      tags: 'API'
    },
    updateBody: { id: 'GUID_COMPANY', name: `Empresa QA Editada ${unique()}`, website: 'https://edited.example.com' },
    idPlaceholder: 'GUID_COMPANY',
    expectedListFields: ['id', 'name', 'website'],
    expectedObjectFields: ['id', 'name']
  },
  {
    key: 'contact-sources',
    name: 'Contact Sources',
    feature: 'Fuentes de contacto',
    hu: 'HU008 - Administrar contactos',
    method: 'GET',
    path: '/contact-sources',
    functionality: 'Administrar fuentes de adquisicion de contactos como LinkedIn, referido o feria.',
    requiredFields: ['name'],
    businessRules: ['La fuente debe tener nombre.', 'La fuente debe ser reutilizable en contactos e indicadores.'],
    positiveBody: { name: `Fuente QA ${unique()}` },
    updateBody: { id: 'GUID_SOURCE', name: `Fuente QA Editada ${unique()}` },
    idPlaceholder: 'GUID_SOURCE',
    expectedListFields: ['id', 'name'],
    expectedObjectFields: ['id', 'name']
  },
  {
    key: 'contacts',
    name: 'Contacts',
    feature: 'Contactos',
    hu: 'HU008 - Administrar contactos / HU009 - Asociar contactos a empresas',
    method: 'GET',
    path: '/Contacts',
    functionality: 'Crear y consultar contactos asociados a una unica empresa en el MVP.',
    requiredFields: ['FirstName', 'LastName', 'Emails', 'CompanyId', 'SourceId'],
    businessRules: ['Un contacto pertenece a una sola empresa.', 'El email debe tener formato valido.', 'La fuente de contacto debe existir.'],
    positiveBody: {
      FirstName: 'QA',
      LastName: `Contacto ${unique()}`,
      Position: 'Gerente',
      Emails: `qa.contacto.${unique()}@example.com`,
      Phone: '3224245167',
      Status: 1,
      CompanyId: '16050910-d7d5-4413-a470-7688d1695b0c',
      SourceId: 'b8908376-f4e7-43b8-8e52-ad7e488f35d9'
    },
    expectedListFields: ['id', 'firstName', 'lastName', 'emails', 'companyId'],
    expectedObjectFields: ['id', 'firstName', 'lastName']
  },
  {
    key: 'activities',
    name: 'Activities',
    feature: 'Actividades comerciales',
    hu: 'HU010 - Administrar actividades comerciales / HU011 - Consultar historial comercial',
    method: 'GET',
    path: '/Activities',
    functionality: 'Registrar y consultar interacciones comerciales con contactos.',
    requiredFields: ['description', 'activityDate', 'contactId', 'activityTypeId'],
    businessRules: ['La actividad debe estar asociada a contacto y tipo existentes.', 'La fecha debe ser ISO 8601 valida.', 'La descripcion es obligatoria.'],
    positiveBody: {
      description: 'Llamada inicial QA',
      activityDate: '2026-06-24T10:00:00Z',
      contactId: '5cb3503e-605d-4333-ae9e-9192e160ad90',
      activityTypeId: '6c09066e-7399-442b-9798-120c9875b274'
    },
    expectedListFields: ['id', 'description', 'activityDate', 'contactId', 'activityTypeId'],
    expectedObjectFields: ['id', 'description', 'activityDate']
  }
];

export const collectionIssues = [
  'Countries usa /Countries para GET/POST, pero /countries para PUT/DELETE.',
  'Contacts usa /contatcts en GET dentro de la coleccion; se automatiza /Contacts como ruta esperada y se cubre el typo como edge tecnico.',
  'Hay mezcla de PascalCase y camelCase en payloads: SectorId, StatusId, Code, FirstName frente a name, cityId.',
  'La coleccion no define headers, ejemplos de respuesta, codigos esperados ni scripts de validacion.'
];
