import com.liferay.portal.kernel.service.ServiceContext
import com.liferay.ratings.kernel.service.RatingsEntryLocalServiceUtil
import com.liferay.portal.kernel.service.ServiceContext;
import com.liferay.portal.kernel.util.GetterUtil;
import com.liferay.portal.kernel.model.Company;
import com.liferay.portal.kernel.model.UserConstants;
import com.liferay.portal.kernel.model.User;
import com.liferay.portal.kernel.service.CompanyLocalServiceUtil;
import com.liferay.portal.kernel.service.ServiceContext;
import com.liferay.portal.kernel.service.UserLocalServiceUtil;
import com.liferay.portal.kernel.util.LocaleUtil;
import com.liferay.portal.kernel.util.PortalUtil;
import java.util.Calendar;
import java.util.GregorianCalendar;
import com.liferay.portal.kernel.util.GetterUtil;
import com.liferay.portal.kernel.exception.PortalException
import com.liferay.portal.kernel.model.User
import com.liferay.portal.kernel.service.UserLocalServiceUtil

def obj = com.liferay.object.service.ObjectEntryLocalServiceUtil.getObjectEntry(id)



ServiceContext serviceContext  = new ServiceContext();


long groupId = GetterUtil.getLong(obj.groupId);
long companyId = GetterUtil.getLong(obj.companyId);
Company company = CompanyLocalServiceUtil.getCompany(companyId);
String portalURL = company.getPortalURL(groupId);
final long creatorUserId = GetterUtil.getLong('20123');

serviceContext.setCompanyId(companyId);
serviceContext.setUserId(creatorUserId);
serviceContext.setPortalURL(portalURL);
serviceContext.setPathMain(PortalUtil.getPathMain());
serviceContext.setScopeGroupId(groupId);


def findUser(emailAddress,companyId)
{
    try {

        User user = UserLocalServiceUtil.getUserByEmailAddress(companyId, emailAddress)

        // Do something with the user object, for example:
        return 1;
    } catch (PortalException pe) {
        // Handle exception
        pe.printStackTrace()
        return 0
    }
    return 0
}

def userId = findUser(email,companyId)

def values = obj.getValues();
values["validationResult"] = userId;
obj.setValues(values);
com.liferay.object.service.ObjectEntryLocalServiceUtil.updateObjectEntry(creatorUserId,id,values,serviceContext);
