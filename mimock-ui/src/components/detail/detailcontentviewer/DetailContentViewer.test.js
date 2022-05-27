import React from 'react';
import { render } from '@testing-library/react';
import DetailContentViewer from './DetailContentViewer';
import { BrowserRouter } from 'react-router-dom';

describe('DetailContentViewer', () => {
	it('should render detail content viewer component', async () => {
		const mock = {
			id: 'c2237051-fdab-424a-9274-77261d16090a',
			mockName: 'Awesome Mock 1651589543',
			description: 'This is a long test description 1234567890',
			route: '/api/v2/google/maps/e3f3ac0f-6c21-4cb9-baae-063f76aacf80',
			httpMethod: {
				id: 2,
				method: 'HEAD',
				createdAt: '2022-04-15T12:00:24.39517+08:00',
				updatedAt: null,
				deletedAt: null,
			},
			statusCode: 200,
			responseContentType: {
				id: 26,
				contentType: 'application/json',
				description: 'JSON format',
				createdAt: '2022-04-15T12:00:24.301247+08:00',
				updateAt: null,
				deletedAt: null,
				responseType: {
					id: 1,
					name: 'TEXTUAL_RESPONSE',
					createdAt: '2022-04-15T12:00:24.495357+08:00',
					updatedAt: null,
					deletedAt: null,
				},
			},
			queryParams: 'serviceName=Student&version=1.0&active=true',
			requestHeaders: {
				id: 1,
				requestHeader: {
					authorization: 'nDFGdgfd_jhgjhZHHTdyhgfdghjdgjh',
				},
				matchExact: false,
				createdAt: '2022-04-15T12:00:36.608916+08:00',
				updatedAt: '2022-04-15T12:00:36.608916+08:00',
				deletedAt: null,
			},
			responseHeaders: {
				id: 38,
				responseHeader: {
					'x-trace-id': 'sadf3w4fr',
				},
				createdAt: '2022-05-03T22:52:22.838445+08:00',
				updatedAt: '2022-05-03T22:52:22.838445+08:00',
				deletedAt: null,
			},
			requestBodiesForMock: {
				id: 1,
				requestBody: {
					id: 1,
					title: 'delectus aut autem',
					userId: 1,
					completed: false,
				},
				createdAt: '2022-04-15T12:00:36.539651+08:00',
				updatedAt: '2022-04-15T12:00:36.544546+08:00',
				deletedAt: null,
				requestBodyType: {
					id: 1,
					requestBodyType: 'application/json',
					createdAt: '2022-04-15T12:00:24.658999+08:00',
					updatedAt: null,
					deletedAt: null,
				},
			},
			textualResponse: {
				id: 38,
				responseBody:
					'[\n  {\n    "_id": "620955ea1157b8b9387a07a4",\n    "index": 0,\n    "guid": "4dd8ecac-105c-4de4-9e96-6bf16ddb1013",\n    "isActive": false,\n    "balance": "$1,042.76",\n    "picture": "http://placehold.it/32x32",\n    "age": 20,\n    "eyeColor": "green",\n    "name": "Jody Buckley",\n    "gender": "female",\n    "company": "OMATOM",\n    "email": "jodybuckley@omatom.com",\n    "phone": "+1 (803) 472-3637",\n    "address": "619 Alton Place, Elrama, Idaho, 8922",\n    "about": "Anim veniam irure veniam quis ex irure dolor fugiat reprehenderit nisi pariatur cillum. Adipisicing commodo deserunt laboris dolor adipisicing consequat deserunt excepteur consequat adipisicing est est laboris. Enim ad consectetur mollit elit pariatur.\\r\\n",\n    "registered": "2018-07-27T01:12:26 -06:-30",\n    "latitude": 55.111467,\n    "longitude": 150.758028,\n    "tags": [\n      "aute",\n      "non",\n      "commodo",\n      "nulla",\n      "anim",\n      "velit",\n      "ipsum"\n    ],\n    "friends": [\n      {\n        "id": 0,\n        "name": "Sellers Obrien"\n      },\n      {\n        "id": 1,\n        "name": "Eaton Battle"\n      },\n      {\n        "id": 2,\n        "name": "Hattie Colon"\n      }\n    ],\n    "greeting": "Hello, Jody Buckley! You have 5 unread messages.",\n    "favoriteFruit": "apple"\n  },\n  {\n    "_id": "620955eabab7b4ea3761da3d",\n    "index": 1,\n    "guid": "1ae879ad-832a-4226-9315-1c65e2ef9a31",\n    "isActive": false,\n    "balance": "$3,302.39",\n    "picture": "http://placehold.it/32x32",\n    "age": 24,\n    "eyeColor": "blue",\n    "name": "Hanson Trujillo",\n    "gender": "male",\n    "company": "VORTEXACO",\n    "email": "hansontrujillo@vortexaco.com",\n    "phone": "+1 (811) 572-3977",\n    "address": "343 Kane Place, Bodega, Georgia, 4378",\n    "about": "Cupidatat adipisicing duis eu qui eiusmod. Esse laboris tempor velit cillum quis proident nisi ut minim reprehenderit. Amet esse et ullamco id enim consectetur nisi dolore tempor. Minim consectetur pariatur ea proident exercitation pariatur est laborum excepteur veniam aliquip. Irure incididunt mollit ea ad culpa Lorem. Veniam culpa voluptate dolore laboris ullamco nisi aute deserunt in esse. Pariatur aliqua sit Lorem consequat in id deserunt aute aliquip.\\r\\n",\n    "registered": "2018-10-05T07:20:02 -06:-30",\n    "latitude": 22.769105,\n    "longitude": 126.130469,\n    "tags": [\n      "consequat",\n      "fugiat",\n      "ipsum",\n      "Lorem",\n      "qui",\n      "nulla",\n      "Lorem"\n    ],\n    "friends": [\n      {\n        "id": 0,\n        "name": "Guzman Robertson"\n      },\n      {\n        "id": 1,\n        "name": "Nielsen Mclaughlin"\n      },\n      {\n        "id": 2,\n        "name": "Therese Randolph"\n      }\n    ],\n    "greeting": "Hello, Hanson Trujillo! You have 8 unread messages.",\n    "favoriteFruit": "banana"\n  },\n  {\n    "_id": "620955ea91b13f7955ea13ae",\n    "index": 2,\n    "guid": "568dec4c-7837-499a-ab5e-572925f115ae",\n    "isActive": false,\n    "balance": "$2,149.27",\n    "picture": "http://placehold.it/32x32",\n    "age": 32,\n    "eyeColor": "green",\n    "name": "Osborn Frye",\n    "gender": "male",\n    "company": "SCENTY",\n    "email": "osbornfrye@scenty.com",\n    "phone": "+1 (917) 581-2166",\n    "address": "964 Schroeders Avenue, Boonville, New Mexico, 4300",\n    "about": "Labore et tempor id fugiat consectetur ullamco exercitation. Ullamco cillum occaecat enim amet nisi consequat in. Velit adipisicing duis sit ex sit id minim. Voluptate incididunt Lorem in minim est excepteur ipsum fugiat. Laboris excepteur excepteur fugiat velit labore nisi Lorem consequat eu ex amet nisi laboris. Exercitation anim ea magna consectetur cillum sit aliquip aute consectetur.\\r\\n",\n    "registered": "2021-09-13T11:26:42 -06:-30",\n    "latitude": 36.624264,\n    "longitude": 116.412831,\n    "tags": [\n      "magna",\n      "sint",\n      "enim",\n      "velit",\n      "duis",\n      "laborum",\n      "esse"\n    ],\n    "friends": [\n      {\n        "id": 0,\n        "name": "Mccullough Vincent"\n      },\n      {\n        "id": 1,\n        "name": "Mabel Woods"\n      },\n      {\n        "id": 2,\n        "name": "Vincent Hicks"\n      }\n    ],\n    "greeting": "Hello, Osborn Frye! You have 3 unread messages.",\n    "favoriteFruit": "banana"\n  },\n  {\n    "_id": "620955ea7bc4fe3bcb76e282",\n    "index": 3,\n    "guid": "ba6d530c-a593-4d00-ac4e-793ccb5fa2cf",\n    "isActive": true,\n    "balance": "$2,740.75",\n    "picture": "http://placehold.it/32x32",\n    "age": 35,\n    "eyeColor": "blue",\n    "name": "Barbara Barlow",\n    "gender": "female",\n    "company": "ENTOGROK",\n    "email": "barbarabarlow@entogrok.com",\n    "phone": "+1 (970) 586-3987",\n    "address": "370 Jamaica Avenue, Dexter, New York, 6668",\n    "about": "Incididunt minim enim quis ipsum culpa. Irure eiusmod tempor in adipisicing cupidatat adipisicing cupidatat cupidatat fugiat dolore sint nostrud. Aliquip quis ut non commodo dolor nisi. Aute reprehenderit ad et quis magna consequat culpa sit laboris esse aliqua dolore. Aute dolor aliqua elit enim magna minim cupidatat aliqua et officia proident sit. Exercitation id Lorem fugiat sunt ipsum ex sit duis irure cillum proident dolore duis sint.\\r\\n",\n    "registered": "2019-03-16T01:09:45 -06:-30",\n    "latitude": -5.044935,\n    "longitude": -152.088944,\n    "tags": [\n      "dolore",\n      "nisi",\n      "occaecat",\n      "Lorem",\n      "proident",\n      "ex",\n      "sint"\n    ],\n    "friends": [\n      {\n        "id": 0,\n        "name": "Tamera Boyle"\n      },\n      {\n        "id": 1,\n        "name": "Wong Russo"\n      },\n      {\n        "id": 2,\n        "name": "Ana Rosario"\n      }\n    ],\n    "greeting": "Hello, Barbara Barlow! You have 8 unread messages.",\n    "favoriteFruit": "apple"\n  },\n  {\n    "_id": "620955ea75234fffe8e0d49a",\n    "index": 4,\n    "guid": "7d90ea8b-8782-4ec6-9d04-53f1022e6558",\n    "isActive": false,\n    "balance": "$1,719.06",\n    "picture": "http://placehold.it/32x32",\n    "age": 34,\n    "eyeColor": "green",\n    "name": "Reynolds Donovan",\n    "gender": "male",\n    "company": "CHILLIUM",\n    "email": "reynoldsdonovan@chillium.com",\n    "phone": "+1 (996) 567-2343",\n    "address": "553 Tapscott Avenue, Richmond, Alaska, 477",\n    "about": "Excepteur veniam tempor et esse est laboris aliquip dolore. Non sunt amet nulla elit nisi laborum ea dolor. Labore velit nostrud nostrud esse magna nulla in voluptate aute. Reprehenderit exercitation duis occaecat pariatur culpa Lorem aliquip culpa velit. In sint nisi dolor reprehenderit ut sunt consectetur irure cillum.\\r\\n",\n    "registered": "2021-01-29T03:26:57 -06:-30",\n    "latitude": 87.403005,\n    "longitude": 167.858255,\n    "tags": [\n      "incididunt",\n      "sint",\n      "cupidatat",\n      "consequat",\n      "ea",\n      "dolore",\n      "eu"\n    ],\n    "friends": [\n      {\n        "id": 0,\n        "name": "Jaime Austin"\n      },\n      {\n        "id": 1,\n        "name": "Delores Fowler"\n      },\n      {\n        "id": 2,\n        "name": "Colette Jimenez"\n      }\n    ],\n    "greeting": "Hello, Reynolds Donovan! You have 2 unread messages.",\n    "favoriteFruit": "banana"\n  },\n  {\n    "_id": "620955eab59987ec352ed957",\n    "index": 5,\n    "guid": "be30f6a9-4d4b-425c-9034-5b85f09994f3",\n    "isActive": false,\n    "balance": "$1,889.49",\n    "picture": "http://placehold.it/32x32",\n    "age": 26,\n    "eyeColor": "green",\n    "name": "Pratt Hudson",\n    "gender": "male",\n    "company": "PROSELY",\n    "email": "pratthudson@prosely.com",\n    "phone": "+1 (836) 594-3970",\n    "address": "680 Utica Avenue, Yogaville, Ohio, 1603",\n    "about": "Veniam nostrud ea consequat et. Voluptate enim amet do mollit qui ea cupidatat duis eu elit excepteur id ut. Lorem tempor quis nulla duis mollit velit anim.\\r\\n",\n    "registered": "2018-09-23T11:00:19 -06:-30",\n    "latitude": 38.917226,\n    "longitude": 111.333,\n    "tags": [\n      "labore",\n      "irure",\n      "quis",\n      "officia",\n      "ad",\n      "consectetur",\n      "sunt"\n    ],\n    "friends": [\n      {\n        "id": 0,\n        "name": "Jacobson Ellison"\n      },\n      {\n        "id": 1,\n        "name": "Merle Fuller"\n      },\n      {\n        "id": 2,\n        "name": "Parks Odom"\n      }\n    ],\n    "greeting": "Hello, Pratt Hudson! You have 7 unread messages.",\n    "favoriteFruit": "banana"\n  }\n]',
				createdAt: '2022-05-03T22:52:22.840023+08:00',
				updatedAt: '2022-05-03T22:52:22.840023+08:00',
				deletedAt: null,
			},
			createdAt: '2022-05-03T22:52:22.842685+08:00',
			updatedAt: '2022-05-03T22:52:22.842685+08:00',
			deletedAt: null,
			entityStatus: {
				id: 1,
				status: 'NONE',
				createdAt: '2022-04-15T12:00:24.434411+08:00',
				updatedAt: null,
				deletedAt: null,
			},
			createdBy: 'Mimock Admin',
			modifiedBy: 'Mimock Admin',
			archived: false,
		};

		const tree = await render(<DetailContentViewer mock={mock} />, {
			wrapper: BrowserRouter,
		});

		const { container, getByTestId } = tree;

		expect(getByTestId('detail-content-viewer-section')).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
