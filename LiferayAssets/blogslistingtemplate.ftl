<style>
    guest-rating
    {
        display: block!important;
        width: 48px!important;

    }
    .fix-middle
    {
        display:flex!important;
    }
    .fix-middle > *
    {
        margin:auto!important
    }
</style>
<div class="row widget-mode-card">
    <ul class="card-page">
        <#if entries?has_content>
            <#list entries as curBlogEntry>
                <#if curBlogEntry.getCoverImageURL(themeDisplay)??>
                    <#assign cardImage = true />
                <#else>
                    <#assign cardImage = false />
                </#if>
                <d-box  liferay-component-type='component' liferay-component-name='blogs-card' pt="1.5rem" pb="1.5rem" pl="1.5rem" pr="1.5rem" className="shadow">
                    <image-text-card textWidth="1.4" imagesWidth="0.6" gap="2rem" textAlign="right">
                        <div slot="title">
                            <d-label color="#838383"><p slot="text" class="d-p2 mt-0">${dateUtil.getDate(curBlogEntry.getStatusDate(), "d MMMM yyyy", locale)}</p></d-label>
                            <#assign viewEntryPortletURL = renderResponse.createRenderURL() />

                            ${viewEntryPortletURL.setParameter("mvcRenderCommandName", "/blogs/view_entry")}
                            ${viewEntryPortletURL.setParameter("redirect", currentURL)}

                            <#if validator.isNotNull(curBlogEntry.getUrlTitle())>
                                ${viewEntryPortletURL.setParameter("urlTitle", curBlogEntry.getUrlTitle())}
                            <#else>
                                ${viewEntryPortletURL.setParameter("entryId", curBlogEntry.getEntryId()?string)}
                            </#if>

                            <d-label><a slot="text" href="${viewEntryPortletURL.toString()}" class="d-h2 mt-0 mb-0" >${htmlUtil.escape(blogsEntryUtil.getDisplayTitle(resourceBundle, curBlogEntry))}</a></d-label>
                        </div>
                        <div slot="description">
                            <d-label color="#838383"><p slot="text" class="d-p1 ellipses-3" >
                                    <#if validator.isNotNull(curBlogEntry.getDescription())>
                                        <#assign content = curBlogEntry.getDescription() />
                                    <#else>
                                        <#assign content = curBlogEntry.getContent() />
                                    </#if>
                                    ${stringUtil.shorten(htmlUtil.stripHtml(content), 150)}

                                </p></d-label>
                            <div class="blog-actions">
															<span class="fix-middle btn-thumbs-up btn btn-outline-borderless btn-sm btn-outline-secondary">
															<guest-rating entry-id="${curBlogEntry.getEntryId()}" entry-type="blog"></guest-rating>
															</span>
                                <span class="fix-middle">
                                          <#if blogsPortletInstanceConfiguration.enableComments()>
                                              <div class="autofit-col">
                                        <#assign viewCommentsPortletURL = renderResponse.createRenderURL() />

                                                  ${viewCommentsPortletURL.setParameter("mvcRenderCommandName", "/blogs/view_entry")}
                                                  ${viewCommentsPortletURL.setParameter("scroll", renderResponse.getNamespace() + "discussionContainer")}

                                                  <#if validator.isNotNull(curBlogEntry.getUrlTitle())>
                                                      ${viewCommentsPortletURL.setParameter("urlTitle", curBlogEntry.getUrlTitle())}
                                                  <#else>
                                                      ${viewCommentsPortletURL.setParameter("entryId", curBlogEntry.getEntryId()?string)}
                                                  </#if>

                                        <a class="btn btn-outline-borderless btn-outline-secondary btn-sm" href="${viewCommentsPortletURL.toString()}" title="${language.get(locale, "comments")}">
											<span class="inline-item inline-item-before">
												<@clay["icon"] symbol="comments" />
											</span> ${commentManager.getCommentsCount("com.liferay.blogs.model.BlogsEntry", curBlogEntry.getEntryId())}
                                        </a>
                                    </div>
                                          </#if>
                                </span>

                                <span class="fix-middle">
                                <#assign bookmarkURL = renderResponse.createRenderURL() />

                                    ${bookmarkURL.setWindowState(windowStateFactory.getWindowState("NORMAL"))}
                                    ${bookmarkURL.setParameter("mvcRenderCommandName", "/blogs/view_entry")}

                                    <#if validator.isNotNull(curBlogEntry.getUrlTitle())>
                                        ${bookmarkURL.setParameter("urlTitle", curBlogEntry.getUrlTitle())}
                                    <#else>
                                        ${bookmarkURL.setParameter("entryId", curBlogEntry.getEntryId()?string)}
                                    </#if>

                                    <@liferay_social_bookmarks["bookmarks"]
                                    className="com.liferay.blogs.model.BlogsEntry"
                                    classPK=curBlogEntry.getEntryId()
                                    maxInlineItems=0
                                    target="_blank"
                                    title=blogsEntryUtil.getDisplayTitle(resourceBundle, curBlogEntry)
                                    types=blogsPortletInstanceConfiguration.socialBookmarksTypes()
                                    url=portalUtil.getCanonicalURL(bookmarkURL.toString(), themeDisplay, themeDisplay.getLayout())
                                    />
                                </span>
                            </div>
                        </div>
                        <div slot="image-container">
                            <image-container type="row">
                                <div slot="image" class="image-row-container__col">

                                    <img src="${cardImage?then(curBlogEntry.getCoverImageURL(themeDisplay), portalUtil.getPathContext(renderRequest) + "/images/cover_image_placeholder.jpg")}">

                                </div>
                            </image-container>
                        </div>
                    </image-text-card>
                </d-box>
            </#list>
        </#if>
    </ul>
</div>
