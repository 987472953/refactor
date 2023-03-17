// 1
public static Integer getBestOfflineTeacherCourseId1(List<TeacherOfflineCourseSetting> teacherOfflineCourseSettings, Integer searchInstrumentId) {
    if (CollectionUtils.isEmpty(teacherOfflineCourseSettings)) {
        return null;
    }
    int minPrice = Integer.MAX_VALUE;
    TeacherOfflineCourseSetting bestTeacherOfflineCourseSetting = null;
    boolean hasSomeInstrument = false;
    for (TeacherOfflineCourseSetting teacherOfflineCourseSetting : teacherOfflineCourseSettings) {
        Integer instrumentId = teacherOfflineCourseSetting.getInstrumentId();
        Integer offlineCoursePrice = teacherOfflineCourseSetting.getOfflineCoursePrice();
        if (InstrumentUtils.isSomeInstrument(instrumentId, searchInstrumentId) && offlineCoursePrice < minPrice) {
            bestTeacherOfflineCourseSetting = teacherOfflineCourseSetting;
            minPrice = offlineCoursePrice;
            hasSomeInstrument = true;
        }
        if (hasSomeInstrument) {
            continue;
        }
        if (offlineCoursePrice < minPrice) {
            bestTeacherOfflineCourseSetting = teacherOfflineCourseSetting;
            minPrice = offlineCoursePrice;
        }
    }
    return Objects.isNull(bestTeacherOfflineCourseSetting) ? null : bestTeacherOfflineCourseSetting.getId();
}

public static Integer getBestOfflineTeacherCourseId(List<TeacherOfflineCourseSetting> teacherOfflineCourseSettings, Integer searchInstrumentId) {
    if (CollectionUtils.isEmpty(teacherOfflineCourseSettings)) {
        return null;
    }
    Optional<TeacherOfflineCourseSetting> bestSetting = teacherOfflineCourseSettings.stream()
            .filter(setting -> InstrumentUtils.isSomeInstrument(setting.getInstrumentId(), searchInstrumentId))
            .min(Comparator.comparingInt(TeacherOfflineCourseSetting::getOfflineCoursePrice));
    if (bestSetting.isPresent()) {
        return bestSetting.get().getId();
    }
    return teacherOfflineCourseSettings.stream()
            .min(Comparator.comparingInt(TeacherOfflineCourseSetting::getOfflineCoursePrice))
            .map(TeacherOfflineCourseSetting::getId)
            .orElse(null);
}