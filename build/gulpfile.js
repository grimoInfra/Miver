/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const gulp = require("gulp");
const { mvBuild } = require("./gulp/gulp.build");
const { provideTempate } = require("./gulp/gulp.template");
const { provideResources } = require("./gulp/gulp.resources");
const { bootstrapHelpersBuild } = require("./gulp/gulp.build.bootstrap");

/**
 * Should have a combination of many tasks in series
 */

gulp.task(
	"build-mv",
	gulp.series(
		mvBuild,provideTempate, provideResources, bootstrapHelpersBuild
	)
);
