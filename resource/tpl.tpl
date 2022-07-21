<?xml version="1.0" encoding="utf-8"?>
<trans name="menu3" desc="菜单请求接口" notlog="true" localCacheSupport="true" localCacheInclude="moduleData">
   <!-- 请求报文，可进行必需项检查，设置缺省值，以及进行字段转换 -->
   <snd>
      <field name="userId" required="false" type="C" desc="用户ID" />
      <field name="os" required="true" type="C" desc="客户端系统id" />
      <field name="version" type="C" required="false" desc="客户端版本号"/>
      <field name="cityId" required="false" type="C" desc="城市编号" default="other"/>
       <field name="groupId" type="C" required="false" desc="用户分组编号" default="other"/>
       <field name="tabId" type="C" required="false" desc="tabId"/>
       <field name="mSort" type="C" required="false" desc="mSort"/>
       <!-- 无需配置，但客户端必须上送 -->
       <field name="signature" type="C" required="false" desc="上次返回报文md5签名"/>
   </snd>
   <!-- 响应报文，可过滤响应信息，并对数据字典进行解析 -->
   <rcv>
      <field name="STATUS" length="6" type="C" desc="返回码" />
      <field name="MSG" length="100" type="C" desc="返回消息" />
      <!-- 无需配置 -->
      <field name="signature" type="C" required="true" desc="本次返回moduleData签名"/>
      <field name="useLocalCache" type="C" required="true" desc="是否使用本地缓存"/>
      
      <!-- 界面管理数据 -->
      <field-list name="moduleData" type="E">
                 <field name="mId" type="C" desc="模块主键" />
                 <field name="picName" type="C" desc="图片名称" />
                 <field name="picClick" type="C" desc="图片点击后名称"/>
                 <field name="name" type="C" desc="模块名称"/>
                 <field name="desc" type="C" desc="模块描述"/>
                 <field name="cityId" type="C" desc="模块所属城市id"/>
                 <field name="groupId" type="C" desc="模块所属用户分组id"/>
                 <field name="createUser" type="C" desc="模块创建者" />
                 <field name="os" type="C" desc="模块客户端系统id" />
                 <field name="mType" type="C" desc="模块类型编号" />
                 <field name="paramId" type="C" desc="关联参数id"/>
                 <field name="paramData" type="C" desc="关联参数"/>
                 <field name="hrefName" type="C" desc="模块链接显示名称--针对07010000,07020000右侧显示名称" />
                 <field name="height" type="C" desc="模块高度" />
                 <field name="mIndex" type="C" desc="父级模块内部序号"/>
                 <field name="isClock" type="C" desc="模块是否锁定" />
                 <field name="mLevel" type="C" desc="模块级别0,1,2,3"/>
                 <field name="parentId" type="C" desc="父级模块id" />
                 <field name="dataIndex" type="C" desc="数据采集坐标" xpath="mIndex" />
                 <field name="activityPrice" type="C" desc="活动价格" />
                 <field name="cust" type="C" desc="客群ID" />
                 <field name="dMStatus" type="C" desc="模板状态" />
                 <field name="frontColor" type="C" desc="字体颜色" />
                 <field name="frontSize" type="C" desc="字体尺寸" />
                 <field name="funcCode" type="C" desc="功能ID" />
                 <field name="goodsId" type="C" desc="商品ID" />
                 <field name="isActivity" type="C" desc="是否活动模式" />
                 <field name="layout" type="C" desc="布局ID" />
                 <field name="mDesc" type="C" desc="骨架模板描述" />
                 <field name="mHeight" type="C" desc="骨架模板高度" />
                 <field name="mName" type="C" desc="骨架模板名称" />
                 <field name="mPic" type="C" desc="骨架模板图片" />
                 <field name="mRuleId" type="C" desc="骨架模板规则ID" />
                 <field name="mRuleName" type="C" desc="骨架模板规则名称" />
                 <field name="mSort" type="C" desc="骨架模板序号" />
                 <field name="mStatus" type="C" desc="骨架模板状态" />
                 <field name="module" type="C" desc="模板ID" />
                 <field name="originalPrice" type="C" desc="原始价格" />
                 <field name="picClickSize" type="C" desc="图片点击尺寸" />
                 <field name="picSize" type="C" desc="数据采集坐标" />
                 <field name="rule" type="C" desc="规则" />
                 <field name="tdId" type="C" desc="TD数据采集坐标" />
           <field-list type="E" name="modules">
                 <field name="mId" type="C" desc="模块主键" />
                 <field name="picName" type="C" desc="图片名称" />
                 <field name="picClick" type="C" desc="图片点击后名称"/>
                 <field name="name" type="C" desc="模块名称"/>
                 <field name="desc" type="C" desc="模块描述"/>
                 <field name="cityId" type="C" desc="模块所属城市id"/>
                 <field name="groupId" type="C" desc="模块所属用户分组id"/>
                 <field name="createUser" type="C" desc="模块创建者" />
                 <field name="os" type="C" desc="模块客户端系统id" />
                 <field name="mType" type="C" desc="模块类型编号" />
                 <field name="paramId" type="C" desc="关联参数id"/>
                 <field name="paramData" type="C" desc="关联参数"/>
                 <field name="hrefName" type="C" desc="模块链接显示名称--针对07010000,07020000右侧显示名称" />
                 <field name="height" type="C" desc="模块高度" />
                 <field name="mIndex" type="C" desc="父级模块内部序号"/>
                 <field name="isClock" type="C" desc="模块是否锁定" />
                 <field name="mLevel" type="C" desc="模块级别0,1,2,3"/>
                 <field name="parentId" type="C" desc="父级模块id" />
                 <field name="dataIndex" type="C" desc="数据采集坐标" xpath="mIndex" />
                 <field name="activityPrice" type="C" desc="活动价格" />
                 <field name="cust" type="C" desc="客群ID" />
                 <field name="dMStatus" type="C" desc="模板状态" />
                 <field name="frontColor" type="C" desc="字体颜色" />
                 <field name="frontSize" type="C" desc="字体尺寸" />
                 <field name="funcCode" type="C" desc="功能ID" />
                 <field name="goodsId" type="C" desc="商品ID" />
                 <field name="isActivity" type="C" desc="是否活动模式" />
                 <field name="layout" type="C" desc="布局ID" />
                 <field name="mDesc" type="C" desc="骨架模板描述" />
                 <field name="mHeight" type="C" desc="骨架模板高度" />
                 <field name="mName" type="C" desc="骨架模板名称" />
                 <field name="mPic" type="C" desc="骨架模板图片" />
                 <field name="mRuleId" type="C" desc="骨架模板规则ID" />
                 <field name="mRuleName" type="C" desc="骨架模板规则名称" />
                 <field name="mSort" type="C" desc="骨架模板序号" />
                 <field name="mStatus" type="C" desc="骨架模板状态" />
                 <field name="module" type="C" desc="模板ID" />
                 <field name="originalPrice" type="C" desc="原始价格" />
                 <field name="picClickSize" type="C" desc="图片点击尺寸" />
                 <field name="picSize" type="C" desc="数据采集坐标" />
                 <field name="rule" type="C" desc="规则" />
                 <field name="tdId" type="C" desc="TD数据采集坐标" />
                 <field-list type="E" name="modules">
                      <field name="mId" type="C" desc="模块主键" />
                      <field name="picName" type="C" desc="图片名称" />
                      <field name="picClick" type="C" desc="图片点击后名称"/>
                      <field name="name" type="C" desc="模块名称" />
                      <field name="desc" type="C" desc="模块描述" />
                      <field name="cityId" type="C" desc="模块所属城市id" />
                      <field name="groupId" type="C" desc="模块所属用户分组id"/>
                      <field name="createUser" type="C" desc="模块创建者"/>
                      <field name="os" type="C" desc="模块客户端系统id" />
                      <field name="mType" type="C" desc="模块类型编号"/>
                      <field name="paramId" type="C" desc="关联参数id" />
                      <field name="paramData" type="C" desc="关联参数"/>
                      <field name="hrefName" type="C" desc="模块链接显示名称--针对07010000,07020000右侧显示名称" />
                      <field name="height" type="C" desc="模块高度" />
                      <field name="mIndex" type="C" desc="父级模块内部序号" />
                      <field name="isClock" type="C" desc="模块是否锁定"/>
                      <field name="mLevel" type="C" desc="模块级别0,1,2,3"/>
                      <field name="parentId" type="C" desc="父级模块id" />
                      <field name="dataIndex" type="C" desc="数据采集坐标"/>
                      <field name="activityPrice" type="C" desc="活动价格" />
                      <field name="cust" type="C" desc="客群ID" />
                      <field name="dMStatus" type="C" desc="模板状态" />
                      <field name="frontColor" type="C" desc="字体颜色" />
                      <field name="frontSize" type="C" desc="字体尺寸" />
                      <field name="funcCode" type="C" desc="功能ID" />
                      <field name="goodsId" type="C" desc="商品ID" />
                      <field name="isActivity" type="C" desc="是否活动模式" />
                      <field name="layout" type="C" desc="布局ID" />
                      <field name="mDesc" type="C" desc="骨架模板描述" />
                      <field name="mHeight" type="C" desc="骨架模板高度" />
                      <field name="mName" type="C" desc="骨架模板名称" />
                      <field name="mPic" type="C" desc="骨架模板图片" />
                      <field name="mRuleId" type="C" desc="骨架模板规则ID" />
                      <field name="mRuleName" type="C" desc="骨架模板规则名称" />
                      <field name="mSort" type="C" desc="骨架模板序号" />
                      <field name="mStatus" type="C" desc="骨架模板状态" />
                      <field name="module" type="C" desc="模板ID" />
                      <field name="originalPrice" type="C" desc="原始价格" />
                      <field name="picClickSize" type="C" desc="图片点击尺寸" />
                      <field name="picSize" type="C" desc="数据采集坐标" />
                      <field name="rule" type="C" desc="规则" />
                      <field name="tdId" type="C" desc="TD数据采集坐标" />
                      <field-list type="E" name="modules">
                            <field name="mId" type="C" desc="模块主键"/>
                            <field name="picName" type="C" desc="图片名称" />
                            <field name="picClick" type="C" desc="图片点击后名称"/>
                            <field name="name" type="C" desc="模块名称"/>
                            <field name="desc" type="C" desc="模块描述"/>
                            <field name="cityId" type="C" desc="模块所属城市id"/>
                            <field name="groupId" type="C" desc="模块所属用户分组id"/>
                            <field name="createUser" type="C" desc="模块创建者" />
                            <field name="os" type="C" desc="模块客户端系统id"/>
                            <field name="mType" type="C" desc="模块类型编号" />
                            <field name="paramId" type="C" desc="关联参数id" />
                            <field name="paramData" type="C" desc="关联参数" />
                            <field name="hrefName" type="C" desc="模块链接显示名称--针对07010000,07020000右侧显示名称" />
                            <field name="height" type="C" desc="模块高度" />
                            <field name="mIndex" type="C" desc="父级模块内部序号"/>
                            <field name="isClock" type="C" desc="模块是否锁定"/>
                            <field name="mLevel" type="C" desc="模块级别0,1,2,3" />
                            <field name="parentId" type="C" desc="父级模块id" />
                            <field name="dataIndex" type="C" desc="数据采集坐标" xpath="mIndex"/>
                            <field name="activityPrice" type="C" desc="活动价格" />
                            <field name="cust" type="C" desc="客群ID" />
                            <field name="dMStatus" type="C" desc="模板状态" />
                            <field name="frontColor" type="C" desc="字体颜色" />
                            <field name="frontSize" type="C" desc="字体尺寸" />
                            <field name="funcCode" type="C" desc="功能ID" />
                            <field name="goodsId" type="C" desc="商品ID" />
                            <field name="isActivity" type="C" desc="是否活动模式" />
                            <field name="layout" type="C" desc="布局ID" />
                            <field name="mDesc" type="C" desc="骨架模板描述" />
                            <field name="mHeight" type="C" desc="骨架模板高度" />
                            <field name="mName" type="C" desc="骨架模板名称" />
                            <field name="mPic" type="C" desc="骨架模板图片" />
                            <field name="mRuleId" type="C" desc="骨架模板规则ID" />
                            <field name="mRuleName" type="C" desc="骨架模板规则名称" />
                            <field name="mSort" type="C" desc="骨架模板序号" />
                            <field name="mStatus" type="C" desc="骨架模板状态" />
                            <field name="module" type="C" desc="模板ID" />
                            <field name="originalPrice" type="C" desc="原始价格" />
                            <field name="picClickSize" type="C" desc="图片点击尺寸" />
                            <field name="picSize" type="C" desc="数据采集坐标" />
                            <field name="rule" type="C" desc="规则" />
                            <field name="tdId" type="C" desc="TD数据采集坐标" />
                      </field-list>
                 </field-list>
           </field-list>
        </field-list>
      
      <!--默认页面设置 -->
      <field name="LMF" length="6" type="C" desc="默认页" />
      <!--自定义icon -->
      <field name="CustomIcons" length="200" type="C" desc="9个用户的自定义icon业务id" />
      <!--全部功能 -->
      <field-list name="AllFunctions" type="E">
        <field name="FUNC_DESC" type="C" desc="功能所属类型"/>
        <field-list name="modules" type="E">
           <field name="FUNC_ID" type="C" desc="功能id"/>
           <field name="FUNC_NAME" type="C" desc="功能名称" />
           <field name="FUNC_DESC" type="C" desc="功能所属类型"/>
           <field name="SMALL_ICON" type="C" desc="小图标"/>
           <field name="MEDIUM_ICON" type="C" desc="中等图标"/>
           <field name="LARGE_ICON" type="C" desc="大图标"/>
           <field name="BP_DESC" type="C" desc="埋点专用字段"/>
           <field name="TD_ID" type="C" desc="TDID"/>
           <field name="URL" type="C" desc="跳转链接"/>
        </field-list>
      </field-list>
   </rcv>
</trans>
